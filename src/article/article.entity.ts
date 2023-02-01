import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("article")
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  subject: string;

  @Column({ length: 1200 })
  text: string;
}
