import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import { CreateZipArchive, ProcessCsv } from './file.service';

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  const filePath = req.file?.path;

  if (!filePath) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  try {
    // Read and process the CSV file
    await ProcessCsv(filePath);

    // Create a zip archive
    await CreateZipArchive(res);
  } catch (error) {
    logger.error(`Error processing file : ${error}`);
    res.status(500).json({ error: 'Error processing file' });
  }
};
