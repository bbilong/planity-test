import { Logger } from 'winston';
import { Express, Request, Response, NextFunction } from 'express';

export const makeErrorLogMiddleware = (logger?: Logger) => {
  return (error: Error, _req: Request, _res: Response, _next: NextFunction): void => {
    if (!error) {
      return;
    }

    logger.error('Error handled on express controller', { error });
  };
};

export const setup = (app: Express, logger?: Logger): void => {
  app.use(makeErrorLogMiddleware(logger));
};
