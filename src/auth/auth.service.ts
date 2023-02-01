import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import { UserEntity } from "../users/users.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateJwt(user: UserEntity): Promise<string> {
    return this.jwtService.sign({ uid: user.id, role: user.getRole() });
  }

  async login(loginDto: LoginDto): Promise<string | undefined> {
    const user = await this.usersService.findOne(
      loginDto.email,
      loginDto.password,
    );

    return this.generateJwt(user);
  }

  async register(registerDto: RegisterDto): Promise<string> {
    const user = await this.usersService.create(
      registerDto.email,
      registerDto.password,
      registerDto.name,
    );

    return this.generateJwt(user);
  }
}
