import { DocumentExtractions, Extraction } from '../types/document';

export const generateMockExtractions = (documentId: string): DocumentExtractions => {
  const numberOfExtractions = Math.floor(Math.random() * 5) + 3; // Generate 3-7 extractions
  const extractions: Extraction[] = [];

  for (let i = 0; i < numberOfExtractions; i++) {
    extractions.push({
      id: `extraction-${i + 1}`,
      text: `Extraction ${i + 1}: Lorem ipsum dolor sit amet`,
      pageNumber: Math.floor(Math.random() * 10) + 1 // Random page number between 1-10
    });
  }

  return {
    documentId,
    extractions: extractions.sort((a, b) => a.pageNumber - b.pageNumber)
  };
}; 