import { Express } from 'express';
import { fileSetup } from '../modules/file/file.setup';

export function setupServices(app: Express): void {
  fileSetup(app);
}
