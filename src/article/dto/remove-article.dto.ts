import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class RemoveArticleDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
