import { JwtModule } from '@nestjs/jwt';
import { confEnv } from './config.env';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

const jwtSetting = JwtModule.register({
    secret: confEnv.JWT_SECRET,
    signOptions: { expiresIn: confEnv.JWT_EXPIRES_SEC },
});

const jwtProvider = {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
};

export { jwtSetting, jwtProvider };
