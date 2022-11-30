import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/models/entities';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role, 'season')
    private roleRepository: Repository<Role>,
  ) {}
  // create(createRoleDto: CreateRoleDto) {
  //   return 'This action adds a new role';
  // }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOne({
      where:{
        roleId:id
      }
    });
  }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} role`;
  // }
}
