import { Test, TestingModule } from '@nestjs/testing';
import { ShedController } from './shed.controller';

describe('ShedController', () => {
  let controller: ShedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShedController],
    }).compile();

    controller = module.get<ShedController>(ShedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
