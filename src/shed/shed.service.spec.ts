import { Test, TestingModule } from '@nestjs/testing';
import { ShedService } from './shed.service';

describe('ShedService', () => {
  let service: ShedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShedService],
    }).compile();

    service = module.get<ShedService>(ShedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
