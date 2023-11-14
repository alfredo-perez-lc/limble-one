import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { Translate } from 'aws-sdk';

@Injectable()
export class AwsTranslateService {
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    @InjectAwsService(Translate)
    private readonly awsTranslate: Translate
  ) {}

  async translate(phrase: string, languageCode: string) {
    const params = {
      Text: phrase,
      SourceLanguageCode: 'EN',
      TargetLanguageCode: languageCode,
    };
    return this.awsTranslate.translateText(params).promise();
  }
}
