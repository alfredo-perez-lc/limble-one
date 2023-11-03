// scope.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScopeDto } from './dto/create-scope.dto';
import { UpdateScopeDto } from './dto/update-scope.dto';
import { Scope } from './entities/scope.entity';

@Injectable()
export class ScopesService {
  constructor(
    @InjectRepository(Scope)
    private scopeRepository: Repository<Scope>
  ) {}

  async create(scopeDto: CreateScopeDto): Promise<Scope> {
    const scope = this.scopeRepository.create(scopeDto);
    return this.scopeRepository.save(scope);
  }
  async findAll() {
    return this.scopeRepository.find();
  }

  async findOne(id: number) {
    return this.scopeRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, scopeDto: UpdateScopeDto) {
    const scope = await this.scopeRepository.preload({
      id,
      ...scopeDto,
    });
    if (!scope) {
      throw new NotFoundException(`Scope #${id} not found`);
    }
    return this.scopeRepository.save(scope);
  }

  async remove(id: number) {
    const scope = await this.findOne(id);
    if (!scope) {
      throw new NotFoundException(`Scope with id:${id} was not found`);
    }
    return this.scopeRepository.remove(scope);
  }
}
