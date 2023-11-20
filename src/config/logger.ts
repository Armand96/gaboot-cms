import * as winston from 'winston';
import * as moment from 'moment';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const loggerOptions = {
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                nestWinstonModuleUtilities.format.nestLike('gaboot', {
                    colors: true,
                    prettyPrint: true,
                }),
            ),
        }),
        new winston.transports.File({
            filename:
                'logs/combined/log-' +
                moment(new Date()).format('YYYY-MM-DD') +
                '.log',
            level: 'verbose',
            handleExceptions: true,
        }),
        new winston.transports.File({
            filename:
                'logs/errors/Errors-' +
                moment(new Date()).format('YYYY-MM-DD') +
                '.log',
            level: 'error',
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' }),
    ],

    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY/MM/DD, HH:mm:ss',
        }),
        winston.format.printf(
            (error) =>
                `[Nest] 5277   - ${[error.timestamp]}  [${error.context}] :  ${
                    error.level
                }: ${error.message} ${error.stack}`,
        ),
    ),
};

console.log();

export { loggerOptions };
