import { Role } from "../../users/enums/role.enum";

export interface IJwtTokenPayload {
  uid: number;
  role: Role;
}
