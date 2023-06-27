import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as moment from 'moment';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      // level: 'info', // Set the desired logging level
      format: winston.format.json(),
      transports: [
        new winston.transports.Console(), // Output logs to the console
        new winston.transports.File({
          filename: 'requests.log',
          level: 'info',
        }),
        new winston.transports.File({ filename: 'errors.log', level: 'error' }), // Add a separate file for error logs,
      ],
    });
  }

  logRequestInfo(req: Request, executionTime: number): void {
    const logData = {
      timestamp: moment().format(), // Current timestamp
      method: req.method,
      url: req.url,
      executionTime: `${executionTime}ms`,
    };

    this.logger.info(logData);
  }
  logError(req: Request, executionTime: number, error: any): void {
    const logData = {
      timestamp: moment().format(),
      method: req.method,
      url: req.url,
      executionTime: `${executionTime}ms`,
      error: error.message, // Log the error message
    };

    this.logger.error(logData);
  }
}
