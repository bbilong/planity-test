import cors from 'cors';
import express, { Express } from 'express';
import responseTime from 'response-time';
import { logger } from '../utils/logger';
import { setupServices } from './services';
import { setup as setupErrorLog } from '../middlewares/errorlog/errorlog.middleware';

export const setupApp = (): Express => {
  const app = express();

  app.use(cors());
  app.use(responseTime());

  setupErrorLog(app, logger);
  setupServices(app);

  app.listen(5858, () => logger.info('Server running on port 5858'));

  return app;
};
