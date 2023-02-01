import { Module } from "@nestjs/common";
import { ArticleModule } from "./article/article.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ArticleModule,
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
