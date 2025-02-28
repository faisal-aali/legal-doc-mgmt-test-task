import axios from 'axios';
import { DocumentMetadata } from '../types/document';

export const API_BASE_URL = 'http://localhost:4000/api';

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

export const getDocumentExtractions = async (documentId: string, totalPages: number): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/documents/${documentId}/extractions?totalPages=${totalPages}`);
  if (!response.ok) {
    throw new Error('Failed to fetch document extractions');
  }
  return response.json();
}; 