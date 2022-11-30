import { SetMetadata } from '@nestjs/common';
import { PERMISSION_TYPE } from 'src/auth/enum/permissions.enum';

export const ROLES_KEY = 'permissions';
export const requiredPermissions = (...roles: PERMISSION_TYPE[]) => SetMetadata(ROLES_KEY, roles);