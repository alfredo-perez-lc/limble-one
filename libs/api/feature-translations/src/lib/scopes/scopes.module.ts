import { Module } from '@nestjs/common';
import { ScopesService } from './scopes.service';
import { ScopesController } from './scopes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scope } from './entities/scope.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scope])],
  controllers: [ScopesController],
  providers: [ScopesService],
})
export class ScopesModule {}
