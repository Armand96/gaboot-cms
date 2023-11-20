import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
    isGlobal: true,
});

const confEnv = {
    MYSQLHOST: process.env.MYSQLHOST,
    MYSQLPORT: process.env.MYSQLPORT,
    MYSQLUSERNAME: process.env.MYSQLUSERNAME,
    MYSQLPASSWORD: process.env.MYSQLPASSWORD,
    MYSQLNAME: process.env.MYSQLNAME,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_SEC: process.env.JWT_EXPIRES_SEC,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    SERVER_PORT: process.env.SERVER_PORT,
    TTL: process.env.RATE_LIMITER_TIMEOUT,
    MAX_REQ: process.env.RATE_LIMITER_MAX_REQ,
};

export { confEnv };
