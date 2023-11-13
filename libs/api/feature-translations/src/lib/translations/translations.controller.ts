import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TranslationsService } from './translations.service';
import {
  CreateTranslationDto,
  UpdateTranslationDto,
} from '@limble/shared/domain';

@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Post()
  create(@Body() createTranslationDto: CreateTranslationDto) {
    return this.translationsService.create(createTranslationDto);
  }

  @Get()
  findAll() {
    return this.translationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTranslationDto: UpdateTranslationDto
  ) {
    return this.translationsService.update(+id, updateTranslationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translationsService.remove(+id);
  }

  // @Get('download-zip')
  // downloadTranslationsZip() {
  //   // const fileStream = this.translationsService.downloadTranslationsZip();
  //   // res.setHeader('Content-Type', 'application/zip');
  //   // res.setHeader(
  //   //   'Content-Disposition',
  //   //   'attachment; filename=translations.zip'
  //   // );
  //   // fileStream.pipe(res);
  // }
}
