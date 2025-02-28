import { Request, Response, NextFunction } from 'express';
import { generateMockExtractions } from '../utils/mockData';
import { DocumentMetadata } from '../types/document';
import { CustomError } from '../utils/errors';

// In-memory storage for document metadata
const documents: Map<string, DocumentMetadata> = new Map();

interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

export const uploadDocument = (req: RequestWithFile, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new CustomError('No file uploaded', 400);
    }

    // Validate file type
    if (req.file.mimetype !== 'application/pdf') {
      throw new CustomError('Only PDF files are allowed', 400);
    }

    const documentId = req.params.id;
    const metadata: DocumentMetadata = {
      id: documentId,
      fileName: req.file.originalname,
      uploadDate: new Date().toISOString(),
      hasFile: true
    };

    documents.set(documentId, metadata);

    res.status(200).json(metadata);
  } catch (error) {
    next(error);
  }
};

export const getExtractions = (req: Request, res: Response, next: NextFunction) => {
  try {
    const documentId = req.params.id;
    const document = documents.get(documentId);

    if (!document || !document.hasFile) {
      throw new CustomError('Document not found', 404);
    }

    const extractions = generateMockExtractions(documentId);
    res.status(200).json(extractions);
  } catch (error) {
    next(error);
  }
};

export const getDocumentMetadata = (req: Request, res: Response, next: NextFunction) => {
  try {
    const documentId = req.params.id;
    const metadata = documents.get(documentId);

    if (!metadata) {
      throw new CustomError('Document not found', 404);
    }

    res.status(200).json(metadata);
  } catch (error) {
    next(error);
  }
}; 