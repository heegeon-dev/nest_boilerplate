import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
  Put,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { successResponse, errorResponse } from "src/utils/responseHandler";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  Permission,
  Role,
  User,
} from "src/models/entities";
import { plainToInstance } from "class-transformer";
import { PermissionGaurd } from "src/guards/permission.guard";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { requiredPermissions } from "src/decorator/requiredPermission.decorator";
import { PERMISSION_TYPE } from "src/auth/enum/permissions.enum";

@ApiExtraModels(
  User,
  Permission,
  Role,
)
@ApiTags("유저 - User")
@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/")
  @ApiResponse({
    status: 200,
    description: "회원가입이 완료되었습니다.",
    schema: {
      properties: {
        statusCode: {
          type: "number",
          default: 200,
        },
        message: {
          type: "array",
          items: {
            type: "string",
            default: "create User",
          },
        },
        data: {
          type: "boolean",
          default: true,
        },
      },
    },
  })
  @ApiOperation({
    summary: "회원가입",
    description: "회원가입",
  })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("businessRegistration"))
  async create(
    @UploadedFile() businessRegistration: Express.MulterS3.File,
  ) {
    // let user = await this.userService.findOneById(signUpFormDataDto["user.id"]);
    // if (user) {
    //   return errorResponse(432);
    // }
    // let json: any = signUpFormDataDto.toJson();
    // let createUserDto = plainToInstance(CreateUserDto, json.user);
    // let createCompanyInfo = plainToInstance(
    //   CreateCompanyInfoDto,
    //   json.companyInfo,
    // );
    // let createPolicyAgreementDto = plainToInstance(
    //   CreatePolicyAgreementDto,
    //   json.policy,
    // );
    // let createRoleDto = plainToInstance(CreateRoleDto, json.role);
    // if (signUpFormDataDto["period"] == 0) {
    //   createUserDto.expiredAt = null;
    // } else {
    //   createUserDto.expiredAt = new Date(
    //     new Date().getTime() +
    //       signUpFormDataDto["period"] * 365 * 24 * 60 * 60 * 1000,
    //   );
    // }

    // if (createRoleDto.roleId == 3) {
    //   if (!businessRegistration) {
    //     return errorResponse(433);
    //   }
    //   createCompanyInfo.isAuthenticated = "N";
    //   createCompanyInfo.businessRegistration = businessRegistration.key;
    // }

    return successResponse(
      200,
      "Create User",
      await this.userService.create(),
    );
  }

  // @Get('/:userId')
  // async findOne(@Param('userId') userId: string) {
  //   return successResponse(
  //     200,
  //     'Get User By userId',
  //     await this.userService.findOneByUserId(+userId),
  //   );
  // }
}
