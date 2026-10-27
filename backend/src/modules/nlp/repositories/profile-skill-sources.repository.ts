import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service.js';
import type { NlpCatalogSkill } from '../types/nlp-catalog-skill.type.js';
import type { NlpTextSource } from '../types/nlp-text-source.type.js';

const joinText = (title: string, description: string | null) =>
  [title, description].filter((part) => Boolean(part?.trim())).join('.\n');

@Injectable()
export class ProfileSkillSourcesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async userExists(userId: string): Promise<boolean> {
    return (await this.prisma.user.count({ where: { id: userId } })) > 0;
  }

  async findTextSources(userId: string): Promise<NlpTextSource[]> {
    const [workExperiences, educations] = await Promise.all([
      this.prisma.workExperience.findMany({
        where: { userId },
        orderBy: { startDate: 'desc' },
        select: { id: true, position: true, description: true },
      }),
      this.prisma.education.findMany({
        where: { userId },
        orderBy: { startDate: 'desc' },
        select: { id: true, degree: true, description: true },
      }),
    ]);

    const cvTexts = await this.prisma.$queryRaw<{cv_id:string;extracted_text:string}[]>`
      SELECT e.cv_id,e.extracted_text FROM radar_cv_evidence e
      JOIN user_cv_file c ON c.id=e.cv_id
      WHERE e.user_id=${userId}::uuid AND e.extraction_status='ready' AND e.review_status IN ('pending','approved')
      ORDER BY c.cv_uploaded_at DESC LIMIT 1`;
    const certifications = await this.prisma.certification.findMany({where:{userId},select:{id:true,name:true,issuingOrganization:true}});
    return [
      ...certifications.map((c):NlpTextSource => ({id:c.id,type:'certification',text:[c.name,c.issuingOrganization].join('. ')})),
      ...cvTexts.map((cv): NlpTextSource => ({id:cv.cv_id,type:'cv',text:cv.extracted_text})),
      ...workExperiences.map((record): NlpTextSource => ({
        id: record.id,
        type: 'work-experience',
        text: joinText(record.position, record.description),
      })),
      ...educations.map((record): NlpTextSource => ({
        id: record.id,
        type: 'education',
        text: joinText(record.degree, record.description),
      })),
    ];
  }

  findCatalog(): Promise<NlpCatalogSkill[]> {
    return this.prisma.skill.findMany({
      where: { isCustom: false },
      select: { id: true, name: true, areaId: true },
    });
  }
}
