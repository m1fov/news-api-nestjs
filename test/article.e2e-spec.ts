import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ArticleModule } from "../src/article/article.module";

describe("ArticleController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, ArticleModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it("POST /create", () => {
    return request(app.getHttpServer())
      .post("/article/create")
      .send({
        subject: "Test subject",
        text: "Test text",
      })
      .expect(200);
  });

  it("DELETE /remove", () => {
    return request(app.getHttpServer())
      .delete("/article/remove")
      .send({
        id: 1,
      })
      .expect(200);
  });
});
