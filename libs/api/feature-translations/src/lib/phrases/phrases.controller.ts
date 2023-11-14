import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  CreatePhraseDto,
  PaginationQueryDto,
  UpdatePhraseDto,
} from '@limble/shared/domain';

@Controller('phrases')
export class PhrasesController {
  constructor(private readonly phrasesService: PhrasesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new phrase' })
  @ApiCreatedResponse({ description: 'Phrase created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createPhraseDto: CreatePhraseDto) {
    return await this.phrasesService.create(createPhraseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a paginated list of  phrases' })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.phrasesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phrasesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhraseDto: UpdatePhraseDto) {
    return this.phrasesService.update(id, updatePhraseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phrasesService.remove(id);
  }

  @Get('count-per-scope/:scopeId')
  @ApiOperation({ summary: 'Count the number of phrases in a specific scope' })
  @ApiOkResponse({ description: 'Returns the number of phrases in the scope' })
  countPhrasesInScope(@Param('scopeId') scopeId: string) {
    return this.phrasesService.countPhrasesInScope(scopeId);
  }

  @Get('duplicated-in-scope/:scopeId')
  @ApiOperation({ summary: 'Find duplicated phrases in a specific scope' })
  @ApiOkResponse({
    description: 'Returns a list of duplicated phrases in the scope',
  })
  duplicatedPhrasesInScope(@Param('scopeId') scopeId: string) {
    return this.phrasesService.findDuplicatedPhrasesInScope(scopeId);
  }

  @Get('duplicated-across-scopes')
  @ApiOperation({ summary: 'Find duplicated phrases across all scopes' })
  @ApiOkResponse({
    description: 'Returns a list of duplicated phrases across all scopes',
  })
  duplicatedPhrasesAcrossScopes() {
    return this.phrasesService.findDuplicatedPhrasesAcrossScopes();
  }
}
