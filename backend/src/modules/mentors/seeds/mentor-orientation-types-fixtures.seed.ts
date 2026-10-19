import type { Prisma } from '../../../prisma/client.js';
import type { FixtureContext } from '../../../common/database/fixture-context.js';

export async function seedMentorOrientationTypesFixtures(
  tx: Prisma.TransactionClient,
  context: FixtureContext,
): Promise<number> {
  const data: Prisma.MentorOrientationTypeCreateManyInput[] = [
    {
      id: context.getId('record-02715'),
      mentorId: context.getId('record-00979'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación profesional',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00151'),
      mentorId: context.getId('record-00979'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación técnica',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01369'),
      mentorId: context.getId('record-00979'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Revisión de CV',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00806'),
      mentorId: context.getId('record-03051'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación técnica',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01717'),
      mentorId: context.getId('record-03051'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Revisión de CV',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01066'),
      mentorId: context.getId('record-03051'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Búsqueda de empleo',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01334'),
      mentorId: context.getId('record-01197'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Revisión de CV',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01503'),
      mentorId: context.getId('record-01197'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Búsqueda de empleo',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01085'),
      mentorId: context.getId('record-01197'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Preparación para entrevistas',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-03039'),
      mentorId: context.getId('record-02670'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Búsqueda de empleo',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-03144'),
      mentorId: context.getId('record-02670'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Preparación para entrevistas',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02693'),
      mentorId: context.getId('record-02670'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación profesional',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-03467'),
      mentorId: context.getId('record-02601'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Preparación para entrevistas',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02313'),
      mentorId: context.getId('record-02601'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación profesional',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02299'),
      mentorId: context.getId('record-02601'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación técnica',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01357'),
      mentorId: context.getId('record-03450'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación profesional',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00322'),
      mentorId: context.getId('record-03450'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación técnica',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02360'),
      mentorId: context.getId('record-03450'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Revisión de CV',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01762'),
      mentorId: context.getId('record-03151'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación técnica',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00996'),
      mentorId: context.getId('record-03151'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Revisión de CV',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01115'),
      mentorId: context.getId('record-03151'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Búsqueda de empleo',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02348'),
      mentorId: context.getId('record-03432'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Revisión de CV',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02817'),
      mentorId: context.getId('record-03432'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Búsqueda de empleo',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-03066'),
      mentorId: context.getId('record-03432'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Preparación para entrevistas',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01644'),
      mentorId: context.getId('record-01403'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Búsqueda de empleo',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01176'),
      mentorId: context.getId('record-01403'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Preparación para entrevistas',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01336'),
      mentorId: context.getId('record-01403'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación profesional',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00260'),
      mentorId: context.getId('record-00241'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Preparación para entrevistas',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-03092'),
      mentorId: context.getId('record-00241'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación profesional',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-03473'),
      mentorId: context.getId('record-00241'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación técnica',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02266'),
      mentorId: context.getId('record-00283'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación profesional',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-03387'),
      mentorId: context.getId('record-00283'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación técnica',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01495'),
      mentorId: context.getId('record-00283'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Revisión de CV',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02480'),
      mentorId: context.getId('record-00412'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación técnica',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01084'),
      mentorId: context.getId('record-00412'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Revisión de CV',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00170'),
      mentorId: context.getId('record-00412'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Búsqueda de empleo',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00206'),
      mentorId: context.getId('record-00122'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Revisión de CV',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01565'),
      mentorId: context.getId('record-00122'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Búsqueda de empleo',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01817'),
      mentorId: context.getId('record-00122'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Preparación para entrevistas',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00306'),
      mentorId: context.getId('record-02093'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Búsqueda de empleo',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02475'),
      mentorId: context.getId('record-02093'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Preparación para entrevistas',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02484'),
      mentorId: context.getId('record-02093'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación profesional',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01690'),
      mentorId: context.getId('record-01983'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Preparación para entrevistas',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01735'),
      mentorId: context.getId('record-01983'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación profesional',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01822'),
      mentorId: context.getId('record-01983'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación técnica',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01218'),
      mentorId: context.getId('record-02511'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación profesional',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00054'),
      mentorId: context.getId('record-02511'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación técnica',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-03157'),
      mentorId: context.getId('record-02511'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Revisión de CV',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00514'),
      mentorId: context.getId('record-00524'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación técnica',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00784'),
      mentorId: context.getId('record-00524'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Revisión de CV',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-01622'),
      mentorId: context.getId('record-00524'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Búsqueda de empleo',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02932'),
      mentorId: context.getId('record-00404'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Revisión de CV',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00746'),
      mentorId: context.getId('record-00404'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Búsqueda de empleo',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-03279'),
      mentorId: context.getId('record-00404'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Preparación para entrevistas',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02195'),
      mentorId: context.getId('record-01608'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Búsqueda de empleo',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-03118'),
      mentorId: context.getId('record-01608'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Preparación para entrevistas',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00960'),
      mentorId: context.getId('record-01608'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación profesional',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02287'),
      mentorId: context.getId('record-03381'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Preparación para entrevistas',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00501'),
      mentorId: context.getId('record-03381'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación profesional',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00956'),
      mentorId: context.getId('record-03381'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación técnica',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02019'),
      mentorId: context.getId('record-00334'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación profesional',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02128'),
      mentorId: context.getId('record-00334'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación técnica',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00794'),
      mentorId: context.getId('record-00334'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Revisión de CV',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-03099'),
      mentorId: context.getId('record-00205'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Orientación técnica',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-02305'),
      mentorId: context.getId('record-00205'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Revisión de CV',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
    {
      id: context.getId('record-00777'),
      mentorId: context.getId('record-00205'),
      orientationTypeId: context.getReference(
        'orientation_types',
        'Búsqueda de empleo',
      ),
      createdAt: context.getDate('anchor', 0, false),
      updatedAt: context.getDate('anchor', 0, false),
    },
  ];
  await tx.mentorOrientationType.createMany({ data, skipDuplicates: true });
  return data.length;
}
