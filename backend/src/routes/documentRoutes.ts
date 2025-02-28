import { Router } from 'express';
import { uploadDocument, getExtractions, getDocumentMetadata } from '../controllers/documentController';
import { upload } from '../middleware/upload';
import {
  validateDocumentId,
  validateTotalPages,
  validateFileUpload,
  handleValidationErrors,
} from '../middleware/validation';

const router = Router();

// Upload document route with validation
router.post(
  '/:id/upload',
  validateDocumentId,
  handleValidationErrors,
  upload.single('file'),
  validateFileUpload,
  uploadDocument
);

// Get extractions route with validation
router.get(
  '/:id/extractions',
  validateDocumentId,
  validateTotalPages,
  handleValidationErrors,
  getExtractions
);

// Get metadata route with validation
router.get(
  '/:id',
  validateDocumentId,
  handleValidationErrors,
  getDocumentMetadata
);

export default router; 