import multer = require('multer');
import type { Request } from 'express';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  fileFilter: (_req: Request, file, cb) => {
    if (/^image\//.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image uploads are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

