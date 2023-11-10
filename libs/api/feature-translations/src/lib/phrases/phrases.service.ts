import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    // TODO: Create a reusable exception for phrase uniqueness
    let existingPhrase = await this.isPhraseKeyUniqueInScope(key, scopeId);
    if (existingPhrase) {
      return new BadRequestException(
        `The phrase key must be unique in the scope, please use another key.
        Existing phrase: ${existingPhrase.text}, key: ${existingPhrase.key}.
        This is in the scope with name "${existingPhrase.scope.name}" - and with the id "${existingPhrase.scope.id}"`
      );
    }

    existingPhrase = await this.isPhraseTextUnique(text);
    if (existingPhrase) {
      return new BadRequestException(
        `The phrase text must be unique, please use another text!
        Existing phrase: ${existingPhrase.text}, key: ${existingPhrase.key}.
        This is in the scope with name "${existingPhrase.scope.name}" - and with the id "${existingPhrase.scope.id}"`
      );
    }

    // Create the phrase
    const phrase = this.phraseRepository.create({ text, scope, key });
    await this.phraseRepository.save(phrase);

    // Translate the phrase to all languages and save them
    const allLanguages = await this.languageRepository.find();
    for (const language of allLanguages) {
      const awsTranslation = await this.aswTranslateService.translate(
        phrase.text,
        language.code
      );
      const translatedText = awsTranslation.TranslatedText;
      const translation = this.translationRepository.create({
        text: translatedText,
        language,
        phrase,
      });
      await this.translationRepository.save(translation);
    }

    return this.findOne(phrase.id);
  }

  @ApiOkResponse({ description: 'Returns a list of phrases' })
  @ApiNotFoundResponse({ description: 'No phrases found' })
  findAll(paginationQuery: PaginationQueryDto) {
    const { limit: take, offset: skip } = paginationQuery;
    return this.phraseRepository.find({
      relations: ['scope', 'translations', 'translations.language'],
      skip,
      take,
      order: { createdAt: 'DESC' },
    });
  }

  // TODO: Add pagination
  async findPhrasesInScope(scopeId: number): Promise<Phrase[]> {
    return this.phraseRepository.find({ where: { scope: { id: scopeId } } });
  }

  async findOne(id: number) {
    const phrase = await this.phraseRepository.findOne({
      where: { id },
      relations: ['scope', 'translations', 'translations.language'],
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

  private isPhraseKeyUniqueInScope(
    key: string,
    scopeId: number
  ): Promise<Phrase | null> {
    return this.phraseRepository.findOne({
      where: { key, scope: { id: scopeId } },
      relations: ['scope'],
    });
  }

  private isPhraseTextUnique(text: string): Promise<Phrase | null> {
    return this.phraseRepository.findOne({
      where: { text },
      relations: ['scope'],
    });
  }
}
