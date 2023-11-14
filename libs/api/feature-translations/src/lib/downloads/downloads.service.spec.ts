import { Test, TestingModule } from '@nestjs/testing';
import { DownloadsService } from './downloads.service';
import { createMock } from '@golevelup/ts-jest';

describe('DownloadsService', () => {
  let service: DownloadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DownloadsService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<DownloadsService>(DownloadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getLanguageJsonFile', () => {});
});
