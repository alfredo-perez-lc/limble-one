import { Module } from '@nestjs/common';
import { AwsTranslateService } from './aws-translate.service';

@Module({
  providers: [AwsTranslateService],
  exports: [AwsTranslateService],
})
export class AwsTranslateModule {}
