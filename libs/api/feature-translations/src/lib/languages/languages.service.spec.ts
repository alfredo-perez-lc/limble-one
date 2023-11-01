import { Test } from '@nestjs/testing';
import { LanguagesService } from './languages.service';

describe('ApiFeatureTranslationsService', () => {
  let service: LanguagesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [LanguagesService],
    }).compile();

    service = module.get(LanguagesService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
