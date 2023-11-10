import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { Translation } from '../translations/entities/translation.entity';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import * as fs from 'fs';
import * as JSZip from 'jszip';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    const language = this.languageRepository.create(createLanguageDto);
    return this.languageRepository.save(language);
  }

  async findAll() {
    return this.languageRepository.find();
  }

  async findAllTranslations(languageId: number) {
    const translations = await this.translationRepository.find({
      where: { language: { id: languageId } },
      relations: ['phrase', 'language'],
    });
    return translations.reduce((prev, current) => {
      return { ...prev, [current.phrase.key]: current.text };
    }, {});
  }

  async findOne(id: number) {
    return this.languageRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    const language = await this.languageRepository.preload({
      id,
      ...updateLanguageDto,
    });
    if (!language) {
      throw new NotFoundException(`Language #${id} not found`);
    }
    return this.languageRepository.save(language);
  }

  async remove(id: number) {
    const language = await this.findOne(id);
    if (!language) {
      throw new NotFoundException(`Language #${id} not found`);
    }
    return this.languageRepository.remove(language);
  }

  // public async seed(languages: CreateLanguageDto[]) {
  //   const languagesCreated: any[] = [];
  //   languages.forEach(async (language) => {
  //     languagesCreated.push(await this.languageRepository.create(language));
  //   });
  //
  //   await this.languageRepository.save(languagesCreated);
  // }

  @ApiOkResponse({
    description: 'Creates JSON file with translations for a specific language',
  })
  @ApiNotFoundResponse({ description: 'Language not found' })
  async generateLanguageJsonFile(languageId: number): Promise<string> {
    try {
      const translationsJson = await this.findAllTranslations(languageId);

      const filePath = `/out/translations/${languageId}.json`;
      fs.writeFileSync(filePath, JSON.stringify(translationsJson, null, 2), {
        encoding: 'utf8',
        flag: 'w',
      });
      return filePath;
    } catch (e) {
      console.log({ e });
      throw new NotFoundException(
        `Error generating the JSON file for  Language #${languageId}`
      );
    }
  }

  public async generateAllJsonFiles() {
    const languages = await this.findAll();
    const filePaths: Array<string> = [];
    for (const language of languages) {
      filePaths.push(await this.generateLanguageJsonFile(language.id));
    }

    const zipData = await JSZip.generateAsync({ type: 'nodebuffer' });
    //
    // archive.pipe(fs.createWriteStream('translations.zip'));
    // filePaths.forEach((filePath) => {
    //   archive.file(filePath, { name: filePath });
    // });
    // await archive.finalize();
    return 'translations.zip';
  }
}
