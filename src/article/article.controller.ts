import { Body, Controller, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { RemoveArticleDto } from "./dto/remove-article.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateArticleDto } from "./dto/update-article.dto";

@ApiTags("Article")
@Controller({
  path: "article",
  version: "1",
})
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post("create")
  @ApiOperation({ summary: "Creating a new news article." })
  @ApiResponse({
    status: 200,
    description: "The record has been successfully created.",
  })
  async create(@Res() res, @Body() createArticleDto: CreateArticleDto) {
    await this.articleService.create(createArticleDto);
    res.status(HttpStatus.OK).send();
  }

  @Post("remove")
  @ApiOperation({ summary: "Delete a news article." })
  @ApiResponse({
    status: 200,
    description: "The record has been successfully removed.",
  })
  @ApiResponse({
    status: 400,
    description: "An entry under this Id was not found.",
  })
  async remove(@Res() res, @Body() removeArticleDto: RemoveArticleDto) {
    const responseCode = await this.articleService.remove(removeArticleDto);
    res.status(responseCode).send();
  }

  @Put("update")
  @ApiOperation({ summary: "Update a news article." })
  @ApiResponse({
    status: 200,
    description: "The record has been successfully updated.",
  })
  @ApiResponse({
    status: 400,
    description: "An entry under this Id was not found.",
  })
  @ApiOperation({ summary: "Update a news article." })
  async update(@Res() res, @Body() updateArticleDto: UpdateArticleDto) {
    const responseCode = await this.articleService.update(updateArticleDto);
    res.status(responseCode).send();
  }
}
