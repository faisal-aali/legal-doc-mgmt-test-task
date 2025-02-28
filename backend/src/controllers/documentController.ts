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
      hasFile: true,
      fileUrl: `/uploads/${req.file.filename}`
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
    const totalPages = parseInt(req.query.totalPages as string);
    const document = documents.get(documentId);

    // Check if document exists in storage, if not create a default metadata
    if (!document) {
      const defaultMetadata: DocumentMetadata = {
        id: documentId,
        fileName: `Document ${documentId}`,
        uploadDate: new Date().toISOString(),
        hasFile: false
      };
      documents.set(documentId, defaultMetadata);
    }

    if (isNaN(totalPages) || totalPages <= 0) {
      throw new CustomError('Invalid total pages parameter', 400);
    }

    // Generate extractions and filter by total pages
    const mockExtractions = generateMockExtractions(documentId);
    const validExtractions = mockExtractions.extractions.filter(ext => ext.pageNumber <= totalPages);

    // Ensure at least one extraction is returned
    if (validExtractions.length === 0) {
      validExtractions.push({
        id: 'default',
        text: 'No text extractions found in this document.',
        pageNumber: 1
      });
    }

    res.status(200).json({
      documentId,
      extractions: validExtractions
    });
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