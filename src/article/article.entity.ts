import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("article")
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  subject: string;

  @Column({ length: 1200 })
  text: string;
}
