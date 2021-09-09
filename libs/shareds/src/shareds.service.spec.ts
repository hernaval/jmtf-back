import { Test, TestingModule } from '@nestjs/testing';
import { SharedsService } from './shareds.service';

describe('SharedsService', () => {
  let service: SharedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedsService],
    }).compile();

    service = module.get<SharedsService>(SharedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
