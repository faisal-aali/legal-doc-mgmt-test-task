import React, { useState } from 'react';
import DocumentBox from './components/DocumentBox';
import DocumentDetailsModal from './components/DocumentDetailsModal';
import Logo from './components/Logo';
import { DocumentMetadata } from './types/document';
import { uploadDocument } from './services/api';
import './App.css';

const App: React.FC = () => {
  const [documents, setDocuments] = useState<Map<string, DocumentMetadata>>(new Map());
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpload = async (id: string, file: File) => {
    try {
      const metadata = await uploadDocument(id, file);
      setDocuments(prev => new Map(prev).set(id, metadata));
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Failed to upload document. Please try again.');
    }
  };

  const handleView = (id: string) => {
    setSelectedDocument(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <Logo />
        <h1>Legal Document Management</h1>
      </header>
      <main className="document-grid">
        {Array.from({ length: 9 }, (_, i) => {
          const id = (i + 1).toString();
          return (
            <DocumentBox
              key={id}
              id={id}
              metadata={documents.get(id) || null}
              onUpload={(file) => handleUpload(id, file)}
              onView={() => handleView(id)}
            />
          );
        })}
      </main>
      {selectedDocument && (
        <DocumentDetailsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          documentId={selectedDocument}
          metadata={documents.get(selectedDocument) || null}
        />
      )}
    </div>
  );
};

export default App;
