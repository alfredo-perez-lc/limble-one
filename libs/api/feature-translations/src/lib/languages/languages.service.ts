import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateLanguageDto,
  Language,
  UpdateLanguageDto,
} from '@limble/shared/domain';

// const JSZip = require('jszip');

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
}
