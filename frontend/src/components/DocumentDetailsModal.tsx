import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Document, Page } from 'react-pdf';
import { DocumentDetailsModalProps, Extraction } from '../types/document';
import { getDocumentExtractions } from '../services/api';
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

  useEffect(() => {
    if (isOpen && documentId) {
      getDocumentExtractions(documentId)
        .then((data) => setExtractions(data.extractions))
        .catch((error) => console.error('Error fetching extractions:', error));
    }
  }, [isOpen, documentId]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
        <div className="pdf-preview">
          <Document
            file={`/api/documents/${documentId}/file`}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div>Loading PDF...</div>}
            error={<div>Error loading PDF.</div>}
          >
            <Page pageNumber={currentPage} />
          </Document>
          {numPages && (
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