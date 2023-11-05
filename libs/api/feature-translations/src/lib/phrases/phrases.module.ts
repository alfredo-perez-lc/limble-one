import { Module } from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { PhrasesController } from './phrases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phrase } from './entities/phrase.entity';
import { Scope } from '../scopes/entities/scope.entity';
import { Language } from '../languages/entities/language.entity';
import { Translation } from '../translations/entities/translation.entity';
import { AwsTranslateModule } from '../util';

@Module({
  imports: [
    AwsTranslateModule,
    TypeOrmModule.forFeature([Phrase, Scope, Language, Translation]),
  ],
  controllers: [PhrasesController],
  providers: [PhrasesService],
})
export class PhrasesModule {}
