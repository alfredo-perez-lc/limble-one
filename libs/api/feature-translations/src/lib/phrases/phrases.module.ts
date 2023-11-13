import { Module } from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { PhrasesController } from './phrases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsTranslateModule } from '../util';
import { Language, Phrase, Scope, Translation } from '@limble/shared/domain';

@Module({
  imports: [
    AwsTranslateModule,
    TypeOrmModule.forFeature([Phrase, Scope, Language, Translation]),
  ],
  controllers: [PhrasesController],
  providers: [PhrasesService],
})
export class PhrasesModule {}
