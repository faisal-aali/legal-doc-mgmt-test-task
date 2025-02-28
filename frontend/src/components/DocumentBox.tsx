import React, { useState } from 'react';
import { DocumentBoxProps } from '../types/document';
import UploadModal from './UploadModal';
import './DocumentBox.css';

const DocumentBox: React.FC<DocumentBoxProps> = ({ id, metadata, onUpload, onView }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleClick = () => {
    if (metadata?.hasFile) {
      onView();
    } else {
      setIsUploadModalOpen(true);
    }
  };

  const handleUpload = (file: File) => {
    onUpload(file);
    setIsUploadModalOpen(false);
  };

  return (
    <>
      <div className="document-box" onClick={handleClick}>
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
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        documentId={id}
      />
    </>
  );
};

export default DocumentBox; 