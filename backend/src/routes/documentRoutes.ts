import express from 'express';
import { uploadDocument, getExtractions, getDocumentMetadata } from '../controllers/documentController';
import { upload } from '../middleware/upload';

const router = express.Router();

// Upload a document
router.post('/:id/upload', upload.single('file'), uploadDocument);

// Get document extractions
router.get('/:id/extractions', getExtractions);

// Get document metadata
router.get('/:id', getDocumentMetadata);

export default router; 