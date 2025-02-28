import { Request, Response } from 'express';
import { generateMockExtractions } from '../utils/mockData';
import { DocumentMetadata } from '../types/document';

// In-memory storage for document metadata
const documents: Map<string, DocumentMetadata> = new Map();

interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

export const uploadDocument = (req: RequestWithFile, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
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
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
};

export const getExtractions = (req: Request, res: Response) => {
  try {
    const documentId = req.params.id;
    const document = documents.get(documentId);

    if (!document || !document.hasFile) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const extractions = generateMockExtractions(documentId);
    res.status(200).json(extractions);
  } catch (error) {
    console.error('Error getting extractions:', error);
    res.status(500).json({ error: 'Failed to get extractions' });
  }
};

export const getDocumentMetadata = (req: Request, res: Response) => {
  try {
    const documentId = req.params.id;
    const metadata = documents.get(documentId);

    if (!metadata) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json(metadata);
  } catch (error) {
    console.error('Error getting document metadata:', error);
    res.status(500).json({ error: 'Failed to get document metadata' });
  }
}; 