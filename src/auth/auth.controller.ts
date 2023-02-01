import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Response,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags("Authorization")
@Controller({
  path: "auth",
  version: "1",
})
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("login")
  @ApiOperation({ summary: "Authorizing an existing user." })
  @ApiResponse({
    status: 200,
    description: "User successfully authorized.",
  })
  @ApiResponse({
    status: 400,
    description: "Wrong user email or password.",
  })
  async login(@Body() loginDto: LoginDto, @Response() res) {
    const token = await this.authService.login(loginDto);

    if (!token) res.status(HttpStatus.BAD_REQUEST).send();

    return res.status(HttpStatus.OK).send(token);
  }

  @Post("register")
  @ApiOperation({ summary: "New user registration." })
  @ApiResponse({
    status: 200,
    description: "User successfully created.",
  })
  async registration(@Response() res, @Body() registerDto: RegisterDto) {
    const token = await this.authService.register(registerDto);

    return res.status(HttpStatus.OK).send(token);
  }

  @UseGuards(JwtAuthGuard)
  @Post("guard")
  @ApiOperation({ summary: "Testing token." })
  async testToken(@Response() res) {
    return res.status(HttpStatus.OK).send();
  }
}
