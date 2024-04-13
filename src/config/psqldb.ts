import { SequelizeModule } from '@nestjs/sequelize';
import { confEnv } from './config.env';

const postgresql = SequelizeModule.forRoot({
    dialect: 'postgres',
    host: confEnv.PSQLHOST,
    port: parseInt(confEnv.PSQLPORT),
    username: confEnv.PSQLUSERNAME,
    password: confEnv.PSQLPASSWORD,
    database: confEnv.PSQLNAME,
    autoLoadModels: true,
    synchronize: false,
});

export { postgresql };
