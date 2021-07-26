import { Module } from "@nestjs/common";

import { GeneralController } from "../../../../src/nest/general/general.controller";
import { GeneralService } from "../../../../src/nest/general/general.service";
import { User } from "../../../user.model";

@Module({
  providers: [
    {
      provide: "entityClass",
      useValue: User
    },
    GeneralService
  ],
  controllers: [GeneralController]
})
export class UserModule {}
