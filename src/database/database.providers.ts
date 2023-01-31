import { DataSource } from "typeorm";
import { dataSourceProvider } from "../shared/constants";
import { ConfigService } from "@nestjs/config";

export const databaseProviders = [
  {
    provide: dataSourceProvider,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: "mysql",
        host: configService.get<string>("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get<string>("database.user"),
        password: configService.get<string>("database.password"),
        database: configService.get<string>("database.schema"),
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
