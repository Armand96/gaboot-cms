import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { GeneralService } from 'src/services/general/general.service';
import { ResponseSuccess } from 'src/services/general/interfaces/response.dto';
// import { ImportService } from 'src/services/import/import.service';
// import { CsvModule } from 'nest-csv-parser';
// import { ExportService } from 'src/services/export/export.service';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        UserService,
        GeneralService,
        ResponseSuccess<User>,
        // ImportService,
        // ExportService,
    ],
    exports: [UserService],
})
export class UserModule {}
