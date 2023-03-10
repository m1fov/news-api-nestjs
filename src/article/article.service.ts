import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { articleRepositoryProvider } from "../shared/constants";
import { Repository } from "typeorm";
import { ArticleEntity } from "./article.entity";
import { CreateArticleDto } from "./dto/create-article.dto";
import { RemoveArticleDto } from "./dto/remove-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@Injectable()
export class ArticleService {
  constructor(
    @Inject(articleRepositoryProvider)
    private articleRepository: Repository<ArticleEntity>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const entity = this.articleRepository.create({
      subject: createArticleDto.subject,
      text: createArticleDto.text,
    });
    await this.articleRepository.save(entity);
  }

  async remove(removeArticleDto: RemoveArticleDto): Promise<HttpStatus> {
    const articles = await this.articleRepository.find({
      where: {
        id: removeArticleDto.id,
      },
    });

    if (articles.length === 0) return HttpStatus.BAD_REQUEST;

    await this.articleRepository.remove(articles);

    return HttpStatus.OK;
  }

  async update(updateArticleDto: UpdateArticleDto): Promise<HttpStatus> {
    const articles = await this.articleRepository.find({
      where: {
        id: updateArticleDto.id,
      },
    });

    if (articles.length === 0) return HttpStatus.BAD_REQUEST;

    const article = articles[0];

    article.text = updateArticleDto.text;
    article.subject = updateArticleDto.subject;

    await this.articleRepository.save([article]);

    return HttpStatus.OK;
  }
}
