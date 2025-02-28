import axios from 'axios';
import { DocumentMetadata, DocumentExtractions } from '../types/document';

const API_BASE_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadDocument = async (documentId: string, file: File): Promise<DocumentMetadata> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post(`/documents/${documentId}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getDocumentMetadata = async (documentId: string): Promise<DocumentMetadata> => {
  const response = await api.get(`/documents/${documentId}`);
  return response.data;
};

export const getDocumentExtractions = async (documentId: string): Promise<DocumentExtractions> => {
  const response = await api.get(`/documents/${documentId}/extractions`);
  return response.data;
}; 