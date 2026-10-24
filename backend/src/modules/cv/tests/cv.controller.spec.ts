import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CvController } from '../controllers/cv.controller.js';
import type { CvService } from '../services/cv.service.js';

const userId = '11111111-1111-4111-8111-111111111111';

const response = {
  id: '22222222-2222-4222-8222-222222222222',
  fileName: 'CV-Test-User.pdf',
  fileType: 'application/pdf',
  sizeInBytes: 1024,
  updatedAt: '2026-10-03T12:00:00.000Z',
  isCurrent: true,
};

describe('CvController', () => {
  let controller: CvController;
  let service: { getMetadata: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    service = { getMetadata: vi.fn() };
    controller = new CvController(service as unknown as CvService);
  });

  it('returns the current cv of the user', async () => {
    service.getMetadata.mockResolvedValue(response);

    await expect(controller.getMetadata(userId)).resolves.toBe(response);
    expect(service.getMetadata).toHaveBeenCalledWith(userId);
  });

  it('exposes only the read endpoint of the current cv', () => {
    const prototype = CvController.prototype as unknown as Record<string, unknown>;

    expect(prototype.upload).toBeUndefined();
    expect(prototype.remove).toBeUndefined();
  });
});
