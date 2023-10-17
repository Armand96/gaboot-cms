import {
    Controller,
    Get,
    Post,
    UseGuards,
    Request,
    Body,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/mainapp/master/user/user.service';
import { ResponseSuccessUser } from 'src/mainapp/master/user/interfaces/response-success-user';

@Controller('auth')
export class AuthController {
    constructor(private authSvc: AuthService, private usrSvc: UserService) { }
    users: ResponseSuccessUser[] = [];

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() atuhDto: AuthDto) {
        return this.authSvc.login(atuhDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('check')
    async getProfile(@Request() req: any) {
        let currentUser = this.users.find(obj => {
            return obj.datum.id == req.user.userId
        })

        if(!currentUser) {
            let userResponse = await this.usrSvc.findOne(req.user.userId);
            this.users.push(userResponse);
            currentUser = userResponse;
        }

        return currentUser;
    }
}
