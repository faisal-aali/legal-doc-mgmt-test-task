export interface DocumentMetadata {
  id: string;
  fileName: string;
  uploadDate: string;
  hasFile: boolean;
  fileUrl?: string;
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

export interface DocumentBoxProps {
  id: string;
  metadata: DocumentMetadata | null;
  onUpload: (file: File) => void;
  onView: () => void;
}

export interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  documentId: string;
}

export interface DocumentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  metadata: DocumentMetadata | null;
} 