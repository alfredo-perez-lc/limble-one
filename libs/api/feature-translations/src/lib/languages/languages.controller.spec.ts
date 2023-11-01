import { Test } from '@nestjs/testing';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';

describe('ApiFeatureTranslationsController', () => {
  let controller: LanguagesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [LanguagesService],
      controllers: [LanguagesController],
    }).compile();

    controller = module.get(LanguagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
