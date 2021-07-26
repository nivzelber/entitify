import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GeneralController } from "../../../../src/nest/general/general.controller";
import { GeneralService } from "../../../../src/nest/general/general.service";
import { User } from "../../../user.model";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
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
