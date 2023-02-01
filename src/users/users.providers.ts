import {
  dataSourceProvider,
  usersRepositoryProvider,
} from "../shared/constants";
import { DataSource } from "typeorm";
import { UserEntity } from "./users.entity";

export const usersProviders = [
  {
    provide: usersRepositoryProvider,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [dataSourceProvider],
  },
];
