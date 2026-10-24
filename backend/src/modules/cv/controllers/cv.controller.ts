import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUserId } from '../../../common/decorators/current-user-id.decorator.js';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard.js';
import { ResponseInterceptor } from '../../../common/interceptors/response.interceptor.js';
import type { CvResponse } from '../responses/cv.response.js';
import { CvService } from '../services/cv.service.js';

@ApiTags('profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
@Controller('profile/me/cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Get()
  @ApiOkResponse({ description: 'Current CV of the authenticated user, or null without CVs' })
  getMetadata(@CurrentUserId() userId: string): Promise<CvResponse | null> {
    return this.cvService.getMetadata(userId);
  }
}
