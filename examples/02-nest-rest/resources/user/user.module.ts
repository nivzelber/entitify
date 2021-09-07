import { GeneralController, GeneralService, Tokens } from "@entitify/nest-rest";
import { Module } from "@nestjs/common";
import { RouterModule } from "nest-router";

import { User } from "./user.model";

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
      provide: Tokens.EntityClass,
      useValue: User
    },
    GeneralService
  ],
  controllers: [GeneralController]
})
export class UserModule {}
