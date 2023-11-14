import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTranslationDto,
  Language,
  Phrase,
  Translation,
  UpdateTranslationDto,
} from '@limble/shared/domain';

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
    const { phraseId, languageId, text } = createTranslationDto;

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
      text,
      phrase,
      language,
    });
    return this.translationRepository.save(translation);
  }

  findAll() {
    return this.translationRepository.find({
      relations: ['phrase', 'language'],
    });
  }

  async findOne(id: string) {
    const translation = await this.translationRepository.findOne({
      where: { id },
      relations: ['phrase', 'language'],
    });

    if (!translation) {
      throw new NotFoundException(`Translation #${id} not found`);
    }

    return translation;
  }

  async update(id: string, updateTranslationDto: UpdateTranslationDto) {
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

  async remove(id: string) {
    const translation = await this.findOne(id);
    if (!translation) {
      throw new NotFoundException(`Translation #${id} not found`);
    }
    return this.translationRepository.remove(translation);
  }

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
