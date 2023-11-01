import { Module } from '@nestjs/common';
import { LanguagesModule } from './languages';
import { TranslationsModule } from './translations';

@Module({
  imports: [LanguagesModule, TranslationsModule],
})
export class ApiFeatureTranslationsModule {}
