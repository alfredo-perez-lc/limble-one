import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Translation } from './entities/translation.entity';
import { Repository } from 'typeorm';
import { Phrase } from '../phrases/entities/phrase.entity';
import { Language } from '../languages/entities/language.entity';

@Injectable()
export class TranslationsService {
  constructor(
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>,
    @InjectRepository(Phrase)
    private phraseRepository: Repository<Phrase>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>
  ) {}

  async create(createTranslationDto: CreateTranslationDto) {
    const { phraseId, languageId, ...rest } = createTranslationDto;

    const phrase = await this.phraseRepository.findOne({
      where: { id: phraseId },
    });
    if (!phrase) {
      throw new NotFoundException('Phrase not found!');
    }

    const language = await this.languageRepository.findOne({
      where: { id: languageId },
    });
    if (!language) {
      throw new NotFoundException('Language not found!');
    }

    const translation = this.translationRepository.create({
      ...rest,
      phrase,
      language,
    });
    return this.translationRepository.save(translation);
  }

  findAll() {
    return this.translationRepository.find();
  }

  findOne(id: number) {
    return this.translationRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateTranslationDto: UpdateTranslationDto) {
    const translation = await this.translationRepository.preload({
      id,
      ...updateTranslationDto,
    });
    if (!translation) {
      throw new NotFoundException(`Translation #${id} not found`);
    }

    const { phraseId, languageId, ...rest } = updateTranslationDto;
    const phrase = await this.phraseRepository.findOne({
      where: { id: phraseId },
    });
    if (!phrase) {
      throw new NotFoundException('Phrase not found');
    }

    const language = await this.languageRepository.findOne({
      where: { id: languageId },
    });
    if (!language) {
      throw new NotFoundException('Language not found');
    }

    Object.assign(translation, rest, { phrase, language });
    return this.translationRepository.save(translation);
  }

  async remove(id: number) {
    const translation = await this.findOne(id);
    if (!translation) {
      throw new NotFoundException(`Translation #${id} not found`);
    }
    return this.translationRepository.remove(translation);
  }

  // @ApiOkResponse({
  //   description: 'Download JSON file with translations for a specific language',
  // })
  // @ApiNotFoundResponse({ description: 'Language not found' })
  // async downloadTranslationsJson(languageCode: string): Promise<Readable> {
  //   const language = await this.languageRepository.findOne({
  //     where: { code: languageCode },
  //   });
  //   if (!language) {
  //     throw new NotFoundException('Language not found');
  //   }
  //
  //   const translations = await this.translationRepository.find({
  //     where: { language },
  //   });
  //
  //   const translationsJson = translations.reduce((json, translation) => {
  //     json[translation.phrase.phraseKey] = translation.translationText;
  //     return json;
  //   }, {});
  //
  //   const tmpFile = tmp.fileSync({ postfix: '.json' });
  //   fs.writeFileSync(tmpFile.name, JSON.stringify(translationsJson, null, 2));
  //
  //   return createReadStream(tmpFile.name);
  // }
  //
  // @ApiOkResponse({
  //   description: 'Download ZIP file with JSON files for all languages',
  // })
  // async downloadTranslationsZip(): Promise<Readable> {
  //   const languages = await this.languageRepository.find();
  //
  //   const tmpDir = tmp.dirSync();
  //   const zipFilePath = path.join(tmpDir.name, 'translations.zip');
  //
  //   const archive = archiver('zip', {
  //     zlib: { level: 9 },
  //   });
  //
  //   const output = fs.createWriteStream(zipFilePath);
  //   archive.pipe(output);
  //
  //   for (const language of languages) {
  //     const translations = await this.translationRepository.find({
  //       where: { language },
  //     });
  //
  //     const translationsJson = translations.reduce((json, translation) => {
  //       json[translation.phrase.phraseKey] = translation.translationText;
  //       return json;
  //     }, {});
  //
  //     const languageCode = language.code;
  //     const languageFilePath = path.join(tmpDir.name, `${languageCode}.json`);
  //     fs.writeFileSync(
  //       languageFilePath,
  //       JSON.stringify(translationsJson, null, 2)
  //     );
  //
  //     archive.file(languageFilePath, { name: `${languageCode}.json` });
  //   }
  //
  //   archive.finalize();
  //
  //   return createReadStream(zipFilePath);
  // }
}
