import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import type { Response } from 'express';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateLanguageDto, UpdateLanguageDto } from '@limble/shared/domain';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @Get()
  findAll() {
    return this.languagesService.findAll();
  }

  @Get(':id/translations')
  findAllTranslations(@Param('id') id: string) {
    return this.languagesService.findAllTranslations(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languagesService.remove(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languagesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto
  ) {
    return this.languagesService.update(id, updateLanguageDto);
  }

  @Get(':id/download')
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({
    description: 'Creates JSON file with translations for a specific language',
  })
  @ApiNotFoundResponse({ description: 'Language not found' })
  async downloadTranslationsJson(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const filePath = await this.languagesService.generateLanguageJsonFile(id);

    const file = createReadStream(join(process.cwd(), filePath));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${filePath}"`,
    });
    return new StreamableFile(file);
  }

  @Get(':id/download-all')
  @Header('Content-Type', 'application/zip')
  async downloadTranslationsZip(@Res({ passthrough: true }) res: Response) {
    await this.languagesService.generateAllJsonFiles();

    const fileName = 'translations.zip';
    const file = readFileSync(join(process.cwd(), fileName));
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    console.log({ file });
    return new StreamableFile(file);
  }
}
