import { Module } from '@nestjs/common';

import { ApiFeatureTranslationsModule } from '@limble/api/feature-translations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedIniFileCredentials, Translate } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';

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
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        region: 'us-east-1',
        credentials: new SharedIniFileCredentials({
          profile: 'default',
        }),
      },
      services: [Translate],
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
