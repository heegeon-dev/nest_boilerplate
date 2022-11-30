import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService:JwtService){
    super();
  }
  // canActivate(
  //   context: ExecutionContext,
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   try{
  //     let req = context.switchToHttp().getRequest();
  //     let accessToken = req.headers.authorization.split(' ')[1];
  //     console.log(this.jwtService.verify(accessToken));
  //   }catch(error){
  //     return false;
  //   }
  //   return true;

  // }
}
