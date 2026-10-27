import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service.js';
import { ProfileRepository } from '../../profile/repositories/profile.repository.js';
import { WorkExperienceRepository } from '../../work-experience/repositories/work-experience.repository.js';
import { EducationsRepository } from '../../educations/repositories/educations.repository.js';
import { SkillRepository } from '../../skills/repositories/skill.repository.js';
import type { NlpCatalogSkill } from '../types/nlp-catalog-skill.type.js';
import type { NlpTextSource } from '../types/nlp-text-source.type.js';

@Injectable()
export class ProfileSkillSourcesRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profileRepository: ProfileRepository,
    private readonly workExperienceRepository: WorkExperienceRepository,
    private readonly educationsRepository: EducationsRepository,
    private readonly skillRepository: SkillRepository,
  ) {}

  userExists(userId: string): Promise<boolean> {
    return this.profileRepository.userExists(userId);
  }

  async findTextSources(userId: string): Promise<NlpTextSource[]> {
    const [workExperiences, educations] = await Promise.all([
      this.workExperienceRepository.findTextSources(userId),
      this.educationsRepository.findTextSources(userId),
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
      ...workExperiences,
      ...educations,
    ];
  }

  findCatalog(): Promise<NlpCatalogSkill[]> {
    return this.skillRepository.findNlpCatalog();
  }
}
