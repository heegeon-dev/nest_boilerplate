import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { isJWT } from 'class-validator';
import { CompanyInfo, PolicyAgreement, User } from 'src/models/entities';
import { UserService } from 'src/user/user.service';
import { errorResponse, successResponse } from 'src/utils/responseHandler';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { UserData } from 'src/decorator/userdata.decorator';

@ApiTags('권한/인증 관련 - auth')
@ApiExtraModels(User, PolicyAgreement, CompanyInfo)
@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({
    summary: '로그인',
    description: 'id, password를 통한 로그인 및 accessToken 발급',
  })
  @ApiBody({
    required: true,
    schema: {
      properties: {
        id: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        keep: {
          type: 'string',
          description: "로그인 유지 - 'on' / 로그인 유지 안함 - 'off'",
        },
        roleId: {
          type: 'number',
          description: '로그인 유저의 roleId',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          default: 200,
        },
        message: {
          type: 'array',
          items: {
            type: 'string',
            default: 'Login Success',
          },
        },
        data: {
          properties: {
            accessToken: {
              type: 'string',
              description: '액세스 토큰',
            },
            refreshToken: {
              type: 'string',
              description: '리프레시 토큰',
            },
          },
        },
      },
    },
  })
  async login(
    @UserData() user:User,
    @Body('keep') keep: string,
    @Body('roleId') roleId: number,
  ) {
    if(user.roles.find(role => role.roleId == roleId)){
      return successResponse(
        200,
        'Login Success',
        {
          accessToken: this.authService.getAccessToken(user),
          refreshToken: this.authService.getRefreshToken(user,keep)
        }
      );  
    }else if(user.roles.find(role => role.roleId == 2)){
      return errorResponse(423);
    }else if(user.roles.find(role => role.roleId == 3)){
      return errorResponse(422);
    }else{
      return errorResponse(424);
    }
  }

  @Post('/refresh')
  @ApiOperation({
    summary: '액세스토큰 재발급',
    description: 'refreshToken을 통한 accessToken 발급',
  })
  @ApiBody({
    required: true,
    schema: {
      properties: {
        refreshToken: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '토큰 재발급 성공',
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          default: 200,
        },
        message: {
          type: 'array',
          items: {
            type: 'string',
            default: 'Refresh Success',
          },
        },
        data: {
          properties: {
            accessToken: {
              type: 'string',
              description: '액세스 토큰',
            },
          },
        },
      },
    },
  })
  async loginRefresh(@Body('refreshToken') refreshToken: string) {
    if (!isJWT(refreshToken)) throw new UnauthorizedException();

    let result = this.jwtService.verify(refreshToken, {
      ignoreExpiration: false,
    });
    const { iat, exp, ...payload } = result;
    let user = await this.userService.findOneByUserId(payload.userId);
    return successResponse(
      200,
      'Refresh Success',
      {
        accessToken: this.authService.getAccessToken(user)
      }
    );
  }
}
