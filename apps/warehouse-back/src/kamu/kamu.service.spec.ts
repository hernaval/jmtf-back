import { Test, TestingModule } from '@nestjs/testing';
import { KamuService } from './kamu.service';

describe('KamuService', () => {
  let service: KamuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KamuService],
    }).compile();

    service = module.get<KamuService>(KamuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
