import React from 'react';
import { Extraction } from '../types/document';

interface ExtractionsPanelProps {
  extractions: Extraction[];
  currentPage: number;
  onGoToPage: (pageNumber: number) => void;
}

const ExtractionsPanel: React.FC<ExtractionsPanelProps> = ({
  extractions,
  currentPage,
  onGoToPage,
}) => {
  return (
    <div className="extractions-panel">
      <h3>Extractions</h3>
      <div className="extractions-list">
        {extractions.map((extraction) => (
          <div key={extraction.id} className="extraction-item">
            <div className="extraction-text">{extraction.text}</div>
            <div className="extraction-page">
              Page {extraction.pageNumber}
              <button
                onClick={() => onGoToPage(extraction.pageNumber)}
                className="go-to-page-button"
                disabled={currentPage === extraction.pageNumber}
              >
                {currentPage === extraction.pageNumber ? 'Current Page' : 'Go to Page'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtractionsPanel; 