import {
  Controller,
  Get,
  Param,
  StandardSchemaValidationPipe,
  StreamableFile,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUserId } from '../../../common/decorators/current-user-id.decorator.js';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard.js';
import { buildRequestValidationException } from '../../../common/utils/build-request-validation-exception.js';
import { cvIdSchema } from '../requests/cv-id.request.js';
import { CvService } from '../services/cv.service.js';
import type { CvFileDownload } from '../types/cv-file-download.type.js';

@ApiTags('profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UsePipes(
  new StandardSchemaValidationPipe({
    exceptionFactory: buildRequestValidationException,
  }),
)
@Controller('profile/me')
export class CvFileController {
  constructor(private readonly cvService: CvService) {}

  @Get('cv/file')
  @ApiProduces('application/pdf')
  async download(@CurrentUserId() userId: string): Promise<StreamableFile> {
    return this.toStreamableFile(await this.cvService.getFile(userId));
  }

  @Get('cvs/:id/file')
  @ApiProduces('application/pdf')
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiNotFoundResponse({ description: 'CV not found for this user' })
  async downloadById(
    @CurrentUserId() userId: string,
    @Param('id', { schema: cvIdSchema }) id: string,
  ): Promise<StreamableFile> {
    return this.toStreamableFile(await this.cvService.getFileById(userId, id));
  }

  private toStreamableFile(download: CvFileDownload): StreamableFile {
    return new StreamableFile(download.content, {
      type: download.mimeType,
      disposition: `inline; filename="${download.fileName}"`,
      length: download.content.length,
    });
  }
}
