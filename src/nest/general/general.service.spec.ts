import { Test, TestingModule } from "@nestjs/testing";

import { GeneralService } from "./general.service";

describe("GeneralService", () => {
  let service: GeneralService<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralService]
    }).compile();

    service = module.get<GeneralService<any>>(GeneralService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
