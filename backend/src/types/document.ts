export interface DocumentMetadata {
  id: string;
  fileName: string;
  uploadDate: string;
  hasFile: boolean;
}

export interface Extraction {
  id: string;
  text: string;
  pageNumber: number;
}

export interface DocumentExtractions {
  documentId: string;
  extractions: Extraction[];
} 