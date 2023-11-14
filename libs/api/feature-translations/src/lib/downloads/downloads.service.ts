import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';

import { InjectRepository } from '@nestjs/typeorm';
import { Language, Translation } from '@limble/shared/domain';
import { Repository } from 'typeorm';

@Injectable()
export class DownloadsService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>
  ) {}

  private async findLanguageTranslations(languageCode: string) {
    const translations = await this.translationRepository.find({
      where: { language: { code: languageCode } },
      relations: ['phrase', 'language'],
    });
    return translations.reduce((prev, current) => {
      return { ...prev, [current.phrase.key]: current.text };
    }, {});
  }

  public async getLanguageJsonFile(languageCode: string): Promise<string> {
    try {
      const translationsJson = await this.findLanguageTranslations(
        languageCode
      );

      const filePath = `${languageCode}.json`;
      fs.writeFileSync(filePath, JSON.stringify(translationsJson, null, 2), {
        encoding: 'utf8',
        flag: 'w',
      });
      return filePath;
    } catch (e) {
      throw new NotFoundException(
        `Error generating the JSON file for Language with code #${languageCode}`
      );
    }
  }

  public async generateAllJsonFiles() {
    const languages = await this.languageRepository.find();
    const filePaths: Array<string> = [];
    for (const language of languages) {
      filePaths.push(await this.getLanguageJsonFile(language.id));
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
