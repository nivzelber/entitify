import cors from "cors";
import express from "express";
import { ConnectionOptions, createConnection } from "typeorm";

import { route } from "../src/express";

import { User } from "./user.model";

const start = async () => {
  const connectionOptions: ConnectionOptions = {
    type: "mssql",
    host: "localhost",
    port: 1434,
    database: "entitify",
    username: "Niv54",
    password: "myCoolDbPassword123",
    entities: ["dist/examples/**/*.model.js"],
    synchronize: true,
    logging: true,
    logger: "advanced-console",
    options: {
      encrypt: false
    }
  };
  await createConnection(connectionOptions);

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));

  const userRouter = route(User);
  app.use("/api/user", userRouter);

  app.listen(3000, () => console.log("App in running"));
};

start();
