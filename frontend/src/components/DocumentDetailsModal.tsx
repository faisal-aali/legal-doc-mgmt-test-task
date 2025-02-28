import React, { useState, useEffect, lazy, Suspense } from 'react';
import Modal from 'react-modal';
import { DocumentDetailsModalProps, Extraction } from '../types/document';
import { getDocumentExtractions } from '../services/api';
import { API_BASE_URL } from '../services/api';
import ExtractionsPanel from './ExtractionsPanel';
import './DocumentDetailsModal.css';

// Lazy load the PDF viewer component
const PDFViewer = lazy(() => import('./PDFViewer'));

Modal.setAppElement('#root');

const DocumentDetailsModal: React.FC<DocumentDetailsModalProps> = ({
  isOpen,
  onClose,
  documentId,
  metadata,
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [extractions, setExtractions] = useState<Extraction[]>([]);
  const [pdfError, setPdfError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && documentId && numPages !== null) {
      getDocumentExtractions(documentId, numPages)
        .then((data) => {
          setExtractions(data.extractions);
        })
        .catch((error) => {
          console.error('Error fetching extractions:', error);
          setExtractions([{
            id: 'default',
            text: 'Unable to load extractions. Please try again later.',
            pageNumber: 1
          }]);
        });
    }
  }, [isOpen, documentId, numPages]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPdfError(null);
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setPdfError(error.message);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="document-modal"
      overlayClassName="document-modal-overlay"
    >
      <div className="modal-header">
        <h2>{metadata?.fileName || 'Document Details'}</h2>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      <div className="modal-content">
        {metadata?.fileUrl ? (
          pdfError ? (
            <div className="error">Failed to load PDF: {pdfError}</div>
          ) : (
            <Suspense fallback={<div className="loading">Loading PDF viewer...</div>}>
              <PDFViewer
                fileUrl={API_BASE_URL.replace('/api', '') + metadata.fileUrl}
                currentPage={currentPage}
                numPages={numPages}
                onPageChange={setCurrentPage}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
              />
            </Suspense>
          )
        ) : (
          <div className="error">No PDF file available.</div>
        )}
        <ExtractionsPanel
          extractions={extractions}
          currentPage={currentPage}
          onGoToPage={setCurrentPage}
        />
      </div>
    </Modal>
  );
};

export default DocumentDetailsModal; 