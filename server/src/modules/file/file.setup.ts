import multer from 'multer';
import { Express } from 'express';
import { uploadFile } from './file.controller';

export const fileSetup = (app: Express): void => {
  const upload = multer({ dest: 'uploads/' });
  app.post('/upload', upload.single('file'), uploadFile);
};
