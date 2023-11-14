import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import {
  CreateLanguageDto,
  Language,
  Translation,
  UpdateLanguageDto,
} from '@limble/shared/domain';

// const JSZip = require('jszip');

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

  async findAllTranslations(languageId: string) {
    const translations = await this.translationRepository.find({
      where: { language: { id: languageId } },
      relations: ['phrase', 'language'],
    });
    return translations.reduce((prev, current) => {
      return { ...prev, [current.phrase.key]: current.text };
    }, {});
  }

  async findOne(id: string) {
    return this.languageRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateLanguageDto: UpdateLanguageDto) {
    const language = await this.languageRepository.preload({
      id,
      ...updateLanguageDto,
    });
    if (!language) {
      throw new NotFoundException(`Language #${id} not found`);
    }
    return this.languageRepository.save(language);
  }

  async remove(id: string) {
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

  async generateLanguageJsonFile(languageId: string): Promise<string> {
    try {
      const translationsJson = await this.findAllTranslations(languageId);

      const filePath = `${languageId}.json`;
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

    // const zip = new JSZip();

    // const zipData = await JSZip.generateAsync({ type: 'nodebuffer' });
    //
    // for (const filePath of filePaths) {
    //   const languageData = fs.readFileSync(filePath);
    //   zip.file(filePath, languageData);
    // }
    // zip
    //   .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    //   .pipe(fs.createWriteStream('translations.zip'))
    //   .on('finish', function () {
    //     console.log('sample.zip written.');
    //   });
  }
}
