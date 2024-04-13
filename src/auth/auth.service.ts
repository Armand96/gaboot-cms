import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/mainapp/master/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './auth.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
    constructor(
        private userSvc: UserService,
        private jwtSvc: JwtService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async validateUser(id: string, pass: string): Promise<any> {
        console.log('validate user');
        const user = await this.userSvc.userOnly(id);
        if (user.datum && user.datum.password === pass) {
            const { ...result } = user.datum;
            return result;
        }
        return null;
    }

    async login(authDto: AuthDto) {
        const user = await this.userSvc.userLogin(
            authDto.username,
            authDto.password,
        );

        if (user == null) {
            throw new HttpException(
                'Wrong Username or password',
                HttpStatus.FORBIDDEN,
            );
        }

        const payload = { username: user.username, sub: user.id };

        let currentData:any = await this.cacheManager.get('users');
        if(currentData == undefined) currentData = [];
        currentData.push(user);
        this.cacheManager.set('users', currentData);

        return {
            accessToken: this.jwtSvc.sign(payload),
        };
    }
}
