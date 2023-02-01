import { Inject, Injectable } from "@nestjs/common";
import { usersRepositoryProvider } from "../shared/constants";
import { Repository } from "typeorm";
import { UserEntity } from "./users.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @Inject(usersRepositoryProvider)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 16);
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  async findOne(
    email: string,
    password: string,
  ): Promise<UserEntity | undefined> {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) return undefined;

    const passwordCorrect = await this.compare(password, user.password);

    if (!passwordCorrect) return undefined;

    return user;
  }

  async create(
    email: string,
    password: string,
    name: string,
  ): Promise<UserEntity> {
    const encryptedPassword = await this.encryptPassword(password);
    const user = this.usersRepository.create({
      email,
      password: encryptedPassword,
      name,
    });

    await this.usersRepository.save([user]);
    return user;
  }
}
