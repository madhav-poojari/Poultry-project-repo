import { Test, TestingModule } from '@nestjs/testing';
import { Inventory } from './inventory';

describe('Inventory', () => {
  let provider: Inventory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Inventory],
    }).compile();

    provider = module.get<Inventory>(Inventory);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
