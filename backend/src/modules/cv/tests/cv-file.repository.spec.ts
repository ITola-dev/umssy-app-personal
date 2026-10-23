import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Prisma } from '../../../prisma/client.js';
import { ProfileNotFoundException } from '../../profile/exceptions/profile-not-found.exception.js';
import type { PrismaService } from '../../../common/prisma/prisma.service.js';
import { CvFileRepository } from '../repositories/cv-file.repository.js';

const recordNotFoundError = new Prisma.PrismaClientKnownRequestError('Record not found', {
  code: 'P2025',
  clientVersion: 'test',
});

const userId = '11111111-1111-4111-8111-111111111111';
const content = Buffer.from([0x25, 0x50, 0x44, 0x46]);

describe('CvFileRepository', () => {
  let repository: CvFileRepository;
  let userCvFile: {
    findFirst: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    userCvFile = {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    repository = new CvFileRepository({ userCvFile } as unknown as PrismaService);
  });

  it('updates the existing cv as base64 with its file name and a fresh upload date', async () => {
    userCvFile.findFirst.mockResolvedValue({ id: 'cv-id' });
    userCvFile.update.mockResolvedValue({ id: 'cv-id' });
    const before = Date.now();

    await expect(repository.save(userId, content, 'resume.pdf')).resolves.toBeUndefined();

    const [args] = userCvFile.update.mock.calls[0] as [
      {
        where: { id: string };
        data: { cvFileName: string; cvPdfData: string; cvUploadedAt: Date };
        select: object;
      },
    ];
    expect(args.where).toEqual({ id: 'cv-id' });
    expect(args.select).toEqual({ id: true });
    expect(args.data).toMatchObject({
      cvFileName: 'resume.pdf',
      cvPdfData: content.toString('base64'),
    });
    expect(args.data.cvUploadedAt.getTime()).toBeGreaterThanOrEqual(before);
  });

  it('creates the cv when none exists for the user', async () => {
    userCvFile.findFirst.mockResolvedValue(null);
    userCvFile.create.mockResolvedValue({ id: 'new-cv-id' });

    await expect(repository.save(userId, content, 'resume.pdf')).resolves.toBeUndefined();

    const [args] = userCvFile.create.mock.calls[0] as [
      {
        data: { userId: string; cvFileName: string; cvPdfData: string; cvUploadedAt: Date };
        select: object;
      },
    ];
    expect(args.select).toEqual({ id: true });
    expect(args.data).toMatchObject({
      userId,
      cvFileName: 'resume.pdf',
      cvPdfData: content.toString('base64'),
    });
  });

  it('stores a null file name when none is given', async () => {
    userCvFile.findFirst.mockResolvedValue({ id: 'cv-id' });
    userCvFile.update.mockResolvedValue({ id: 'cv-id' });

    await repository.save(userId, content);

    const [args] = userCvFile.update.mock.calls[0] as [{ data: { cvFileName: null } }];
    expect(args.data.cvFileName).toBeNull();
  });

  it('reads only the pdf column and returns it decoded as a buffer', async () => {
    userCvFile.findFirst.mockResolvedValue({ cvPdfData: content.toString('base64') });

    const result = await repository.read(userId);

    expect(userCvFile.findFirst).toHaveBeenCalledWith({
      where: { userId },
      orderBy: { cvUploadedAt: 'desc' },
      select: { cvPdfData: true },
    });
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result).toEqual(content);
  });

  it('returns null when the cv has no data', async () => {
    userCvFile.findFirst.mockResolvedValue({ cvPdfData: null });

    await expect(repository.read(userId)).resolves.toBeNull();
  });

  it('returns null when the user has no cv row', async () => {
    userCvFile.findFirst.mockResolvedValue(null);

    await expect(repository.read(userId)).resolves.toBeNull();
  });

  it('removes the cv row of the user', async () => {
    userCvFile.findFirst.mockResolvedValue({ id: 'cv-id' });
    userCvFile.delete.mockResolvedValue({ id: 'cv-id' });

    await expect(repository.remove(userId)).resolves.toBeUndefined();
    expect(userCvFile.delete).toHaveBeenCalledWith({
      where: { id: 'cv-id' },
      select: { id: true },
    });
  });

  it('fails with a domain exception when there is no cv to remove', async () => {
    userCvFile.findFirst.mockResolvedValue(null);

    await expect(repository.remove(userId)).rejects.toBeInstanceOf(ProfileNotFoundException);
  });
});
