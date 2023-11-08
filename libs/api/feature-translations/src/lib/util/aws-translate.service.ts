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
    // aws.config.credentials = new AWS.Credentials('access key', 'secret key');
    //
    // const translate = new AWS.Translate({ region: AWS.config.region });
    const params = {
      Text: phrase,
      SourceLanguageCode: 'EN',
      TargetLanguageCode: languageCode,
    };
    return this.awsTranslate.translateText(params).promise();

    // return this.awsTranslate.translateText(params, function (err, data) {
    //   if (err) {
    //     console.log(err, err.stack);
    //     return;
    //   }
    //   if (data) {
    //     console.log({ data });
    //   }
    //   return data as TranslateTextResponse;
    // }).promise();
  }
}
