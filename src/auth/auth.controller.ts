import {
    Controller,
    Get,
    Post,
    UseGuards,
    Request,
    Body,
    UsePipes,
    ValidationPipe,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/mainapp/master/user/user.service';
import { ResponseSuccessUser } from 'src/mainapp/master/user/interfaces/response-success-user';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authSvc: AuthService,
        private usrSvc: UserService,
    ) {}
    users: ResponseSuccessUser[] = [];

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() atuhDto: AuthDto) {
        console.log("========= LOGIN =========");
        return this.authSvc.login(atuhDto);
    }

    @Get('logout')
    logout() {
        return 'OK';
    }

    @ApiBearerAuth('jwt')
    @UseGuards(JwtAuthGuard)
    @Get('check')
    async getProfile(@Request() req: any) {
        let currentUser: ResponseSuccessUser = {} as ResponseSuccessUser;

        console.log("REQ USER", req.user);
    }
}
