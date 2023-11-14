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
        region: 'us-west-1',
        credentials: new SharedIniFileCredentials({
          profile: 'personal-user',
        }),
      },
      services: [Translate],
    }),
    ApiFeatureTranslationsModule,
  ],
})
export class AppModule {}
