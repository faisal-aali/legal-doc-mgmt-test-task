import React from 'react';
import { DocumentBoxProps } from '../types/document';
import './DocumentBox.css';

const DocumentBox: React.FC<DocumentBoxProps> = ({ id, metadata, onUpload, onView }) => {
  const handleClick = () => {
    if (metadata?.hasFile) {
      onView();
    } else {
      document.getElementById(`file-input-${id}`)?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    } else {
      alert('Please select a PDF file');
    }
  };

  return (
    <div className="document-box" onClick={handleClick}>
      <input
        type="file"
        id={`file-input-${id}`}
        accept=".pdf"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className="document-content">
        {metadata?.hasFile ? (
          <>
            <h3>{metadata.fileName}</h3>
            <p>Uploaded: {new Date(metadata.uploadDate).toLocaleDateString()}</p>
          </>
        ) : (
          <>
            <h3>Legal Document {id}</h3>
            <p>Click to upload</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentBox; 