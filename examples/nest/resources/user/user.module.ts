import { Module } from "@nestjs/common";
import { RouterModule } from "nest-router";

import { GeneralController, GeneralService } from "../../../../src/nest/";
import { User } from "../../../user.model";

@Module({
  imports: [
    RouterModule.forRoutes([
      {
        path: "/user",
        module: UserModule
      }
    ])
  ],
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
