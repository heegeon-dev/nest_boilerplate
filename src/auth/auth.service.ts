import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Role, User } from "src/models/entities";
import {
  ALLOWED_COMPANYINFO_PROPERTY_NAMES,
  ALLOWED_USER_PROPERTY_NAMES,
} from "src/constants/allowPropertyNames";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(Role, "season")
    private roleRepository: Repository<Role>,
  ) {}

  async validateUser(id: string, password: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    let hashingPassword = bcrypt.hashSync(password, user.salt);
    if (user && user.password === hashingPassword) {
      let userInfo = this.removeUnallowedUserInfo({...user})
      return userInfo;
    }
    return null;
  }

  removeUnallowedUserInfo(user: User){
    Object.keys(user?.companyInfo).forEach((companyPropertyName) => {
      if (!ALLOWED_COMPANYINFO_PROPERTY_NAMES.includes(companyPropertyName)) {
        delete user.companyInfo[companyPropertyName];
      }
    });

    Object.keys(user).forEach((userPropertyName) => {
      if (!ALLOWED_USER_PROPERTY_NAMES.includes(userPropertyName)) {
        delete user[userPropertyName];
      }
    });
    return user;
  }

  getAccessToken(user: User){
    let userinfo = this.removeUnallowedUserInfo(user);
    return this.jwtService.sign({...userinfo}, {
      expiresIn: "1h",
    });
  }

  getRefreshToken(user: User, keep: string){
    return this.jwtService.sign(
      {
        userId: user.userId,
        id: user.id,
        keep: keep
      },
      {
        expiresIn: keep == "on" ? "365d" : "3h",
      },
    )
  }

  // async login(user: User, keep: string) {
  //   return {
  //     accessToken: this.jwtService.sign(user, {
  //       expiresIn: "1h",
  //     }),
  //     refreshToken: this.jwtService.sign(
  //       {
  //         userId: user.userId,
  //         id: user.id,
  //         keep: keep
  //       },
  //       {
  //         expiresIn: keep == "on" ? "365d" : "3h",
  //       },
  //     ),
  //   };
  // }
  // async refresh(user: User,) {
  //   return {
  //     accessToken: this.jwtService.sign(
  //       {
  //         userId: user.userId,
  //         id: user.id,
  //         keep: keep
  //       }, {
  //       expiresIn: "1h",
  //     }),
  //   };
  // }
  getRoles() {
    return this.roleRepository.find();
  }
}
