import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { confEnv } from 'src/config/config.env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: confEnv.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        console.log('payload', payload);
        // console.log('date to number', new Date());
        return { userId: payload.sub, username: payload.username };
    }
}
