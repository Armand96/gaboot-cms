import { WinstonModule } from 'nest-winston/dist/winston.module';
import { loggerOptions } from './logger';

const wsLogger = WinstonModule.createLogger(loggerOptions);
export { wsLogger };
