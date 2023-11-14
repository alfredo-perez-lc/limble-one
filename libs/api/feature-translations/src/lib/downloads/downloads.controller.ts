import {
  Controller,
  Get,
  Header,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import type { Response } from 'express';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';

@Controller('downloads')
export class DownloadsController {
  constructor(private readonly downloadsService: DownloadsService) {}

  @Get('/download-all')
  @Header('Content-Type', 'application/zip')
  async downloadTranslationsZip(@Res({ passthrough: true }) res: Response) {
    await this.downloadsService.generateAllJsonFiles();

    const fileName = 'translations.zip';
    const file = readFileSync(join(process.cwd(), fileName));
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    console.log({ file });
    return new StreamableFile(file);
  }

  @Get(':languageCode')
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({
    description: 'Creates JSON file with translations for a specific language',
  })
  @ApiNotFoundResponse({ description: 'Language not found' })
  async downloadTranslationsJson(
    @Param('languageCode') languageCode: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const filePath = await this.downloadsService.getLanguageJsonFile(
      languageCode
    );

    const file = createReadStream(join(process.cwd(), filePath));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${filePath}"`,
    });
    return new StreamableFile(file);
  }
}
