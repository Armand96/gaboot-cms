import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/mainapp/master/user/entities/user.entity';

export const USER = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as User; // extract token from request
    },
);
