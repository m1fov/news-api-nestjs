import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { articleProviders } from "./article.providers";
import { ArticleService } from "./article.service";
import { ArticleController } from "./article.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleController],
  providers: [...articleProviders, ArticleService],
})
export class ArticleModule {}
