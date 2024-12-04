import fs from 'fs';
import archiver from 'archiver';
import csvParser from 'csv-parser';
import { Response } from 'express';

export const ProcessCsv = (filePath: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const maleStream = fs.createWriteStream('male.csv');
    const femaleStream = fs.createWriteStream('female.csv');

    const readStream = fs.createReadStream(filePath);
    let headers: string[] = [];

    readStream
      .pipe(csvParser())
      .on('headers', (headerList) => {
        headers = headerList;
        const headerLine = headers.join(',') + '\n';

        maleStream.write(headerLine);
        femaleStream.write(headerLine);
      })
      .on('data', row => {
        if (row.gender === 'male') {
          maleStream.write(`${Object.values(row).join(',')}\n`);
        } else if (row.gender === 'female') {
          femaleStream.write(`${Object.values(row).join(',')}\n`);
        }
      })
      .on('end', () => {
        // Close the streams
        maleStream.end();
        femaleStream.end();
        resolve();
      })
      .on('error', reject);
  });
};

export const CreateZipArchive = async (res: Response): Promise<void> => {
  const archive = archiver('zip', { zlib: { level: 9 } });
  res.attachment('result.zip');

  archive.pipe(res);
  archive.file('male.csv', { name: 'male.csv' });
  archive.file('female.csv', { name: 'female.csv' });

  await archive.finalize();

  // Cleanup temporary files
  fs.unlinkSync('male.csv');
  fs.unlinkSync('female.csv');
};
