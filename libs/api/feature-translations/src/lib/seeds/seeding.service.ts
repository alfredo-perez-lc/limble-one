import { Injectable } from '@nestjs/common';
import { languagesMocks, LanguagesService } from '../languages';

@Injectable()
export class SeedingService {
  public constructor(private readonly languagesService: LanguagesService) {}

  public async seed() {
    await this.languagesService.seed(languagesMocks.data.seed);
  }
}
