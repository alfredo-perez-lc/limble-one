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
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

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
  findAllTranslations(@Param('id') id: number) {
    return this.languagesService.findAllTranslations(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languagesService.remove(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto
  ) {
    return this.languagesService.update(+id, updateLanguageDto);
  }

  @Get(':id/download')
  @Header('Content-Type', 'application/json')
  async downloadTranslationsJson(
    @Param('id') id: number,
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

    const file = createReadStream(join(process.cwd(), 'translations.zip'));
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=translations.zip'
    );
    return new StreamableFile(file);
  }
}
