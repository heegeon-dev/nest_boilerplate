import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "src/models/entities";
import { Repository } from "typeorm";

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission, "season")
    private permissionRepository: Repository<Permission>,
  ) {}
  // create(createPermissionDto: CreatePermissionDto) {
  //   return 'This action adds a new permission';
  // }

  findAll() {
    return this.permissionRepository.find();
  }

  findOne(id: number) {
    return this.permissionRepository.findOne({ where: { permissionId: id } });
  }

  // update(id: number, updatePermissionDto: UpdatePermissionDto) {
  //   return `This action updates a #${id} permission`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} permission`;
  // }
}
