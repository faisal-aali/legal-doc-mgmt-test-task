import { Request, Response, NextFunction } from 'express';
import { createDocument, getDocumentMetadata as getDocumentMetadataFromService, getDocumentExtractions } from '../services/documentService';
import { CustomError } from '../utils/errors';
import { DocumentMetadata } from '../types/document';

interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

export const uploadDocument = (req: RequestWithFile, res: Response, next: NextFunction) => {
  try {
    const documentId = req.params.id;
    const metadata = createDocument(documentId, req.file!);
    res.status(200).json(metadata);
  } catch (error) {
    next(error);
  }
};

export const getExtractions = (req: Request, res: Response, next: NextFunction) => {
  try {
    const documentId = req.params.id;
    const totalPages = parseInt(req.query.totalPages as string);
    const result = getDocumentExtractions(documentId, totalPages);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getDocumentMetadata = (req: Request, res: Response, next: NextFunction) => {
  try {
    const documentId = req.params.id;
    const metadata = getDocumentMetadataFromService(documentId);
    res.status(200).json(metadata);
  } catch (error) {
    next(error);
  }
}; 