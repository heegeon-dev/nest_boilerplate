import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';

@ApiTags("역할 - role")
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Post()
  // create(@Body() createRoleDto: CreateRoleDto) {
  //   return this.roleService.create(createRoleDto);
  // }

  @ApiOperation({
    summary: '전체 역할(role) 불러오기',
    description:"전체 역할(role) 불러오기"
  })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({
    summary: '특정 역할(role) 불러오기',
    description:"특정 역할(role) 불러오기"
  })
  @Get(':roleId')
  findOne(@Param('roleId') roleId: string) {
    return this.roleService.findOne(+roleId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.roleService.update(+id, updateRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.roleService.remove(+id);
  // }
}
