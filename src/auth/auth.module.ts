import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { jwtSetting } from 'src/config/jwt';
import { UserModule } from 'src/mainapp/master/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [UserModule, PassportModule, jwtSetting],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    // exports: [AuthService],
})
export class AuthModule { }
