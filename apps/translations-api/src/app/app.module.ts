import { Module } from '@nestjs/common';

import { ApiFeatureTranslationsModule } from '@limble/api/feature-translations';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'pass123',
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ApiFeatureTranslationsModule,
  ],
})
export class AppModule {
  // constructor(private readonly languagesService: LanguagesService) {}
  //
  // async onApplicationBootstrap(): Promise<void> {
  //   // await this.seedsService.seed();
  //   await this.languagesService.seed(languagesMocks.data.seed);
  // }
}
