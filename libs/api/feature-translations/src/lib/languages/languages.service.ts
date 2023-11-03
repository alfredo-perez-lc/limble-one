import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    const language = this.languageRepository.create(createLanguageDto);
    return this.languageRepository.save(language);
  }

  async findAll() {
    return this.languageRepository.find();
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

  public async seed(languages: CreateLanguageDto[]) {
    const languagesCreated: any[] = [];
    languages.forEach(async (language) => {
      languagesCreated.push(await this.languageRepository.create(language));
    });

    await this.languageRepository.save(languagesCreated);
  }
}
