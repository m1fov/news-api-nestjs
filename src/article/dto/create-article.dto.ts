import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subject: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;
}
