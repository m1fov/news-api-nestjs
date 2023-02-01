import { DataSource } from "typeorm";
import { ArticleEntity } from "./article.entity";
import {
  articleRepositoryProvider,
  dataSourceProvider,
} from "../shared/constants";

export const articleProviders = [
  {
    provide: articleRepositoryProvider,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ArticleEntity),
    inject: [dataSourceProvider],
  },
];
