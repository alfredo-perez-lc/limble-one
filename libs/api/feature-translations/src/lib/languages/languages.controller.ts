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

  @Get(':id/download')
  @Header('Content-Type', 'application/json')
  async downloadTranslationsJson(
    @Param('id') id: number,
    @Res({ passthrough: true }) res: Response
  ) {
    const filePath = await this.languagesService.generateResultsJsonFile(id);

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${filePath}"`,
    });

    // Pipe the file to the response
    // const fileStream = fs.createReadStream(filePath);
    // console.log({ fileStream });
    // fileStream.pipe(res);
    //
    // // Delete the file after sending it
    // fileStream.on('close', () =>
    //   fs.unlink(
    //     filePath,
    //     // eslint-disable-next-line @typescript-eslint/no-empty-function
    //     () => {}
    //   )
    // );

    // Handle errors and end of the stream
    // fileStream.on('error', (err) => {
    //   console.error('Error reading file:', err);
    //   res.status(500).end();
    // });
    //
    // fileStream.on('end', () => {
    //   // Delete the file after sending it
    //   fs.unlink(filePath, (err) => {
    //     if (err) {
    //       console.error('Error deleting file:', err);
    //     }
    //   });
    // });
    //
    // // Pipe the file stream to the response
    // fileStream.pipe(res);

    const file = createReadStream(join(process.cwd(), filePath));
    res.set({
      'Content-Type': 'application/json',
      // 'Content-Disposition': 'attachment; filename="package.json"',
      'Content-Disposition': `attachment; filename="${filePath}"`,
    });
    return new StreamableFile(file);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languagesService.remove(+id);
  }
}
