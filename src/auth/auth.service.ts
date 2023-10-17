import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/mainapp/master/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private userSvc: UserService, private jwtSvc: JwtService) { }

    async validateUser(id: number, pass: string): Promise<any> {
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

        const payload = { username: user.userName, sub: user.id };
        return {
            accessToken: this.jwtSvc.sign(payload),
        };
    }
}
