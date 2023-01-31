import { DataSource } from "typeorm";
import { Article } from "./article.entity";
import {
  articleRepositoryProvider,
  dataSourceProvider,
} from "../shared/constants";

export const articleProviders = [
  {
    provide: articleRepositoryProvider,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Article),
    inject: [dataSourceProvider],
  },
];
