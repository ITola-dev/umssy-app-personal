import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service.js';
import { mapRecordNotFound } from '../../../common/utils/map-record-not-found.js';
import { ProfileNotFoundException } from '../../profile/exceptions/profile-not-found.exception.js';
import type { FileStorage } from '../../../common/types/file-storage.type.js';

const cvContentSelect = { cvPdfData: true } as const;

const cvIdSelect = { id: true } as const;

@Injectable()
export class CvFileRepository implements FileStorage {
  constructor(private readonly prisma: PrismaService) {}

  async save(ownerId: string, content: Buffer, fileName?: string): Promise<void> {
    const data = {
      cvFileName: fileName ?? null,
      cvUploadedAt: new Date(),
      cvPdfData: content.toString('base64'),
    };

    const existing = await this.prisma.userCvFile.findFirst({
      where: { userId: ownerId },
      orderBy: { cvUploadedAt: 'desc' },
      select: cvIdSelect,
    });

    if (existing) {
      await this.prisma.userCvFile.update({
        where: { id: existing.id },
        data,
        select: cvIdSelect,
      });
    } else {
      await this.prisma.userCvFile.create({
        data: { userId: ownerId, ...data },
        select: cvIdSelect,
      });
    }
  }

  async read(ownerId: string): Promise<Buffer | null> {
    const cv = await this.prisma.userCvFile.findFirst({
      where: { userId: ownerId },
      orderBy: { cvUploadedAt: 'desc' },
      select: cvContentSelect,
    });

    return cv?.cvPdfData ? Buffer.from(cv.cvPdfData, 'base64') : null;
  }

  async remove(ownerId: string): Promise<void> {
    const existing = await this.prisma.userCvFile.findFirst({
      where: { userId: ownerId },
      orderBy: { cvUploadedAt: 'desc' },
      select: cvIdSelect,
    });

    if (!existing) {
      throw new ProfileNotFoundException();
    }

    await mapRecordNotFound(
      this.prisma.userCvFile.delete({
        where: { id: existing.id },
        select: cvIdSelect,
      }),
      () => new ProfileNotFoundException(),
    );
  }
}
