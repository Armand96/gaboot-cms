import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
    Inject,
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { confEnv } from 'src/config/config.env';
import { User } from 'src/mainapp/master/user/entities/user.entity';
import { UserService } from 'src/mainapp/master/user/user.service';
import { Cache } from 'cache-manager';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';

@Injectable()
export class RbacMiddleware implements NestMiddleware {
    constructor(
        private usrSvc: UserService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    users: User[] = [];
    respUser: ResponseSuccess<User> = new ResponseSuccess<User>();

    async use(req: Request, res: any, next: () => void) {
        this.users = await this.cacheManager.get('users');
        if(this.users == undefined) this.users = [];

        const data = this.jwt(req);
        let currentUser = this.users.find((usr) => {
            return usr.id == (data.sub);
        });

        try {
            // console.log("BASE URL",req.baseUrl);
            // console.log("current user", currentUser);
            if (req.baseUrl == '/auth/logout') {
                const index = this.users.indexOf(currentUser, 0);
                this.users.splice(index, 1);
                await this.cacheManager.set('users', this.users);
                // console.log('RBAC ', this.users.length);
                return next();
            }

            if (currentUser == undefined) {
                currentUser = (await this.usrSvc.findOne((data.sub).toString()))
                    .datum;
                // console.log('USERS', this.users);
                this.users.push(currentUser);
                this.cacheManager.set('users', this.users);
            }

            if(req.baseUrl == '/auth/check') {
                if(currentUser) {
                    this.respUser.message = "Success Get User";
                    this.respUser.datum = currentUser;
                    res.writeHead(200, { 'content-type': 'application/json' })
                    res.write(JSON.stringify(this.respUser))
                    res.end()
                }
            }

            req.user = currentUser;
            // console.log('USERS', this.users);

            for (
                let index = 0;
                index < currentUser.role.access.length;
                index++
            ) {
                const element = currentUser.role.access[index];
                if (element.backend_url == req.baseUrl) return next();
            }
        } catch (error) {
            throw error;
            // const index = this.users.indexOf(currentUser, 0);
            // if (index > -1) {
            //     this.users.splice(index, 1);
            // }
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
            const data = verify(accessToken, confEnv.JWT_SECRET);
            return data;
        } catch (error) {
            throw new UnauthorizedException('JWT Expired');
        }
    }
}
