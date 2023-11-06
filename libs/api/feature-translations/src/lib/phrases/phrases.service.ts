import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Phrase } from './entities/phrase.entity';
import { In, Repository } from 'typeorm';
import { Scope } from '../scopes/entities/scope.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PaginationQueryDto } from '../pagination-query.dto';
import { Translation } from '../translations/entities/translation.entity';
import { AwsTranslateService } from '../util';
import { Language } from '../languages';

@Injectable()
export class PhrasesService {
  constructor(
    @InjectRepository(Phrase)
    private phraseRepository: Repository<Phrase>,
    @InjectRepository(Scope)
    private scopeRepository: Repository<Scope>,
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>,
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    private aswTranslateService: AwsTranslateService
  ) {}

  @ApiCreatedResponse({ description: 'Phrase created successfully' })
  @ApiNotFoundResponse({ description: 'Scope or language not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(createPhraseDto: CreatePhraseDto) {
    const { scopeId, text, key } = createPhraseDto;

    // TODO: Investigate if I can create a validator for this
    const scope = await this.scopeRepository.findOne({
      where: { id: scopeId },
    });
    if (!scope) {
      throw new NotFoundException('Scope not found');
    }

    // Create the phrase
    const phrase = this.phraseRepository.create({ text, scope, key });
    await this.phraseRepository.save(phrase);

    // Translate the phrase to all languages and save them
    const allLanguages = await this.languageRepository.find();
    for (const language of allLanguages) {
      const text = 'this is a mocked translations';
      const translation = this.translationRepository.create({
        text,
        language,
        phrase,
      });
      await this.translationRepository.save(translation);
    }

    return this.findOne(phrase.id);

    // const translation = await this.aswTranslateService.translate(text, 'es');
    // console.log({ translation });
  }

  @ApiOkResponse({ description: 'Returns a list of phrases' })
  @ApiNotFoundResponse({ description: 'No phrases found' })
  findAll(paginationQuery: PaginationQueryDto) {
    const { limit: take, offset: skip } = paginationQuery;
    return this.phraseRepository.find({
      relations: ['scope'],
      skip,
      take,
    });
  }

  // TODO: Add pagination
  async findPhrasesInScope(scopeId: number): Promise<Phrase[]> {
    return this.phraseRepository.find({ where: { scope: { id: scopeId } } });
  }

  async findOne(id: number) {
    const phrase = await this.phraseRepository.findOne({
      where: { id },
      relations: ['scope', 'translations'],
    });

    if (!phrase) {
      throw new NotFoundException('Phrase not found');
    }

    return phrase;
  }

  //TODO: Add validator that the key is unique in the scope
  //TODO: Add validator that the key is unique in all scopes
  async update(id: number, updatePhraseDto: UpdatePhraseDto) {
    const phrase = await this.findOne(id);

    const { scopeId, ...rest } = updatePhraseDto;

    const scope = await this.scopeRepository.findOne({
      where: { id: scopeId },
    });
    if (!scope) {
      throw new NotFoundException('Scope not found');
    }

    Object.assign(phrase, rest, { scope });
    return this.phraseRepository.save(phrase);
  }

  async remove(id: number) {
    const phrase = await this.findOne(id);
    if (!phrase) {
      throw new NotFoundException('Phrase not found');
    }
    await this.phraseRepository.delete(id);
  }

  @ApiOkResponse({ description: 'Returns the number of phrases in the scope' })
  async countPhrasesInScope(scopeId: number): Promise<number> {
    return this.phraseRepository.count({ where: { scope: { id: scopeId } } });
  }

  async countPhrasesInEachScope(): Promise<{ scope: Scope; count: number }[]> {
    const scopes = await this.scopeRepository.find();
    const countPromises = scopes.map(async (scope) => {
      const phraseCount = await this.phraseRepository.count({
        where: { scope: { id: scope.id } },
      });
      return { scope, count: phraseCount };
    });
    return Promise.all(countPromises);
  }

  async findDuplicatedPhrasesInScope(scopeId: number): Promise<Phrase[]> {
    const duplicatePhrases = await this.phraseRepository
      .createQueryBuilder('phrase')
      .select('phrase.id')
      .addSelect('COUNT(phrase.phraseKey) AS keyCount')
      .where('phrase.scope = :scopeId', { scopeId })
      .groupBy('phrase.phraseKey')
      .having('COUNT(phrase.phraseKey) > 1')
      .getRawMany();
    const duplicatePhraseIds = duplicatePhrases.map((entry) => entry.phrase_id);

    if (duplicatePhraseIds.length === 0) {
      return [];
    }
    return this.phraseRepository.findBy({ id: In(duplicatePhraseIds) });
  }

  @ApiOkResponse({
    description: 'Returns a list of duplicated phrases across all scopes',
  })
  async findDuplicatedPhrasesAcrossScopes(): Promise<Phrase[]> {
    const duplicatePhrases = await this.phraseRepository
      .createQueryBuilder('phrase')
      .select('phrase.id')
      .addSelect('COUNT(phrase.phraseKey) AS keyCount')
      .groupBy('phrase.phraseKey')
      .having('COUNT(phrase.phraseKey) > 1')
      .getRawMany();
    const duplicatePhraseIds = duplicatePhrases.map((entry) => entry.phrase_id);

    if (duplicatePhraseIds.length === 0) {
      return [];
    }
    return this.phraseRepository.findBy({ id: In(duplicatePhraseIds) });
  }
}
