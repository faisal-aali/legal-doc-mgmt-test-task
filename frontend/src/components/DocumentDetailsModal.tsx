import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Document, Page, pdfjs } from 'react-pdf';
import { DocumentDetailsModalProps, Extraction } from '../types/document';
import { getDocumentExtractions } from '../services/api';
import { API_BASE_URL } from '../services/api';
import './DocumentDetailsModal.css';

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
    if (isOpen && documentId) {
      getDocumentExtractions(documentId)
        .then((data) => setExtractions(data.extractions))
        .catch((error) => console.error('Error fetching extractions:', error));
    }
  }, [isOpen, documentId]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPdfError(null);
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setPdfError(error.message);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  console.log('metadata', metadata);

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
        <div className="pdf-preview">
          {metadata?.fileUrl ? (
            <>
              <div className="pdf-content">
                <Document
                  file={API_BASE_URL.replace('/api', '') + metadata.fileUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={<div className="loading">Loading PDF...</div>}
                  error={
                    <div className="error">
                      {pdfError ? `Error: ${pdfError}` : 'Failed to load PDF.'}
                    </div>
                  }
                >
                  {numPages !== null && numPages > 0 && (
                    <div style={{ width: '100%' }}>
                      <Page 
                        pageNumber={currentPage} 
                        scale={1.0}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        width={800}
                      />
                    </div>
                  )}
                </Document>
              </div>
              {numPages !== null && numPages > 0 && (
                <div className="pdf-navigation">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage <= 1}
                  >
                    Previous
                  </button>
                  <span>Page {currentPage} of {numPages}</span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))}
                    disabled={currentPage >= numPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="error">No PDF file available.</div>
          )}
        </div>
        <div className="extractions-panel">
          <h3>Extractions</h3>
          <div className="extractions-list">
            {extractions.map((extraction) => (
              <div key={extraction.id} className="extraction-item">
                <div className="extraction-text">{extraction.text}</div>
                <div className="extraction-page">
                  Page {extraction.pageNumber}
                  <button
                    onClick={() => goToPage(extraction.pageNumber)}
                    className="go-to-page-button"
                  >
                    Go to Page
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DocumentDetailsModal; 