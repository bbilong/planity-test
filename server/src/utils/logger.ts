import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  format: format.combine(format.json(), format.colorize()),
  levels: {
    alert: 1,
    error: 2,
    warning: 3,
    info: 4,
    debug: 5,
  },
  transports: [new transports.Console({ format: format.json() })],
});
