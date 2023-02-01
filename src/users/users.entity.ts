import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./enums/role.enum";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  email: string;

  @Column("text")
  password: string;

  @Column("text")
  name: string;

  @Column({ default: Role.Guest })
  role: string;
  /** Set role from enum for user */
  setRole(role: Role): void {
    this.role = role;
  }
  /** Get user role */
  getRole(): Role {
    return Role[this.role];
  }
}
