import { Module } from '@nestjs/common';
import { PhrasesModule } from './phrases/phrases.module';
import { TranslationsModule } from './translations/translations.module';
import { ScopesModule } from './scopes/scopes.module';
import { LanguagesModule } from './languages';

@Module({
  imports: [PhrasesModule, TranslationsModule, ScopesModule, LanguagesModule],
})
export class ApiFeatureTranslationsModule {}
