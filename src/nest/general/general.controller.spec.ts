import { Test, TestingModule } from '@nestjs/testing';
import { GeneralController } from './general.controller';
import { GeneralService } from './general.service';

describe('GeneralController', () => {
  let controller: GeneralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralController],
      providers: [GeneralService],
    }).compile();

    controller = module.get<GeneralController>(GeneralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
