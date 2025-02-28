import { DocumentMetadata } from '../types/document';
import { generateMockExtractions } from '../utils/mockData';
import { CustomError } from '../utils/errors';

// In-memory storage for document metadata
const documents: Map<string, DocumentMetadata> = new Map();

export const createDocument = (
  documentId: string,
  file: Express.Multer.File
): DocumentMetadata => {
  if (!file) {
    throw new CustomError('No file uploaded', 400);
  }

  if (file.mimetype !== 'application/pdf') {
    throw new CustomError('Only PDF files are allowed', 400);
  }

  const metadata: DocumentMetadata = {
    id: documentId,
    fileName: file.originalname,
    uploadDate: new Date().toISOString(),
    hasFile: true,
    fileUrl: `/uploads/${file.filename}`
  };

  documents.set(documentId, metadata);
  return metadata;
};

export const getDocumentMetadata = (documentId: string): DocumentMetadata => {
  const metadata = documents.get(documentId);
  if (!metadata) {
    throw new CustomError('Document not found', 404);
  }
  return metadata;
};

export const getOrCreateDefaultMetadata = (documentId: string): DocumentMetadata => {
  let document = documents.get(documentId);
  
  if (!document) {
    document = {
      id: documentId,
      fileName: `Document ${documentId}`,
      uploadDate: new Date().toISOString(),
      hasFile: false
    };
    documents.set(documentId, document);
  }
  
  return document;
};

export const getDocumentExtractions = (documentId: string, totalPages: number) => {
  if (isNaN(totalPages) || totalPages <= 0) {
    throw new CustomError('Invalid total pages parameter', 400);
  }

  // Get or create document metadata
  getOrCreateDefaultMetadata(documentId);

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

  return {
    documentId,
    extractions: validExtractions
  };
}; 