import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PERMISSION_TYPE } from "src/auth/enum/permissions.enum";
import { User } from "src/models/entities";

@Injectable()
export class PermissionGaurd implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<PERMISSION_TYPE[]>(
      "permissions",
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user as User;
    return requiredPermissions.some((permissionId) =>
      user.permissions
        .map((permission) => permission.permissionId)
        .includes(permissionId as number)
    );
  }
}
