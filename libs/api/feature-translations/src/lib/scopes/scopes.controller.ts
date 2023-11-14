import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ScopesService } from './scopes.service';
import { CreateScopeDto, UpdateScopeDto } from '@limble/shared/domain';

@Controller('scopes')
export class ScopesController {
  constructor(private readonly scopesService: ScopesService) {}

  @Post()
  create(@Body() createScopeDto: CreateScopeDto) {
    return this.scopesService.create(createScopeDto);
  }

  @Get()
  findAll() {
    return this.scopesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scopesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScopeDto: UpdateScopeDto) {
    return this.scopesService.update(id, updateScopeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scopesService.remove(id);
  }
}
