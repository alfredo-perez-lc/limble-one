import { Module } from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { PhrasesController } from './phrases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phrase } from './entities/phrase.entity';
import { Scope } from '../scopes/entities/scope.entity';
import { Language } from '../languages/entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phrase, Scope, Language])],
  controllers: [PhrasesController],
  providers: [PhrasesService],
})
export class PhrasesModule {}
