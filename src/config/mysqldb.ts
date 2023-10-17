import { SequelizeModule } from '@nestjs/sequelize';
import { confEnv } from './config.env';

const mysql = SequelizeModule.forRoot({
    dialect: 'mysql',
    host: confEnv.MYSQLHOST,
    port: parseInt(confEnv.MYSQLPORT),
    username: confEnv.MYSQLUSERNAME,
    password: confEnv.MYSQLPASSWORD,
    database: confEnv.MYSQLNAME,
    autoLoadModels: true,
});

export { mysql };
