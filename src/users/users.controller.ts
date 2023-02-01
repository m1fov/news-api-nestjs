import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller({
  path: "users",
  version: "1",
})
export class UsersController {
  constructor(private usersService: UsersService) {}
}
