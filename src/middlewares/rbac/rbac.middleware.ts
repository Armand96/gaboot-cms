import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { confEnv } from 'src/config/config.env';
import { User } from 'src/mainapp/master/user/entities/user.entity';
import { UserService } from 'src/mainapp/master/user/user.service';

@Injectable()
export class RbacMiddleware implements NestMiddleware {
  constructor(private usrSvc: UserService) { }
  users: User[] = [];

  async use(req: Request, res: any, next: () => void) {

    let data = this.jwt(req);
    let currentUser = this.users.find(usr => {
      return usr.id == Number(data.sub);
    });

    try {
      console.log(req.baseUrl);
      if (req.baseUrl == '/auth/logout') {
        const index = this.users.indexOf(currentUser, 0);
        this.users.splice(index, 1);
      }

      if (!currentUser) {
        currentUser = (await this.usrSvc.findOne(Number(data.sub))).datum;
        this.users.push(currentUser)
      }

      req.user = currentUser;
      // console.log('USERS', this.users);

      for (let index = 0; index < currentUser.role.access.length; index++) {
        const element = currentUser.role.access[index];
        if (element.backendUrl == req.baseUrl) return next();
      }
    } catch (error) {
      const index = this.users.indexOf(currentUser, 0);
      if (index > -1) {
        this.users.splice(index, 1);
      }
      throw new UnauthorizedException('Please log in');
    }
    throw new UnauthorizedException(
      'You are not authorized to access this route',
    );
    // next();
  }

  jwt(req: Request) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];

    if (!bearerHeader || !accessToken) {
      throw new UnauthorizedException('Please log in');
    }

    try {
      let data = verify(accessToken, confEnv.JWT_SECRET);
      return data;
    } catch (error) {
      throw new UnauthorizedException('JWT Expired');
    }

  }
}
