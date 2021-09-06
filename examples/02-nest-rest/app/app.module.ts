import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";

import { Address } from "../../models/address.model";
import { User } from "../../models/user.model";
import { UserModule } from "../resources/user/user.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mssql",
      host: "localhost",
      port: 1434,
      database: "entitify",
      username: "Niv54",
      password: "myCoolDbPassword123",
      entities: [User, Address],
      // next values are optional
      synchronize: true,
      logging: true,
      logger: "advanced-console",
      options: {
        encrypt: false
      }
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private connection: Connection) {}
}
