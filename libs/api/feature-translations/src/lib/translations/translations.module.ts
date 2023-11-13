import { Module } from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { TranslationsController } from './translations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language, Phrase, Translation } from '@limble/shared/domain';

@Module({
  imports: [TypeOrmModule.forFeature([Translation, Phrase, Language])],
  controllers: [TranslationsController],
  providers: [TranslationsService],
  exports: [TranslationsService],
})
export class TranslationsModule {}
