import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  User,
  Role,
  Permission,
} from "src/models/entities";
import {
  CreateUserDto,
  CreateRoleDto,
  UpdateUserDto,
} from "./dto";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { CheckUserInformation } from "./dto/check-user-imformation.dto";
import { Mailer } from "src/utils/mailer";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, "season")
    private userRepository: Repository<User>,
    @InjectRepository(Role, "season")
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission, "season")
    private permissionRepository: Repository<Permission>,
    private mailer: Mailer,
  ) {}

  async create(
  ) {
    let salt = bcrypt.genSaltSync();

    let connection = this.userRepository.manager.connection;
    let result = await connection.transaction(
      async (transactionalEntityManager) => {
        // let user = await transactionalEntityManager.getRepository(User).save({
        //   ...createUserDto,
        //   roles: [role],
        //   permissions: await this.permissionRepository
        //     .createQueryBuilder("permission")
        //     .leftJoinAndSelect("permission.role", "role")
        //     .andWhere("role.roleId=:roleId", { roleId: createRoleDto.roleId })
        //     .getMany()
        // });

        return true;
      },
    );
    return result;
  }

  findAll() {
    return `This action returns all user`;
  }
}
