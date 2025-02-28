import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import { CustomError } from '../utils/errors';

// Configure multer for handling PDF uploads
const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    // Generate unique filename with timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Check MIME type
  if (file.mimetype !== 'application/pdf') {
    return cb(new CustomError('Only PDF files are allowed', 400));
  }

  // Check file extension
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.pdf') {
    return cb(new CustomError('Only .pdf files are allowed', 400));
  }

  cb(null, true);
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB limit
  files: 1 // Only allow 1 file per upload
};

export const upload = multer({
  storage,
  fileFilter,
  limits
}); 