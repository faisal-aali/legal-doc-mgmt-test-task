# Legal Document Management System

A modern web application for managing and viewing legal documents with text extraction capabilities. Built with React, TypeScript, and Express.js.

## Features

- 📄 PDF Document Upload & Management
- 🔍 Text Extraction from Documents
- 📱 Responsive Document Viewer
- 🎯 Page Navigation & Extraction Highlighting
- 💻 Modern, User-Friendly Interface

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- react-pdf for PDF rendering
- react-modal for modals
- Axios for API communication

### Backend
- Node.js
- Express.js
- TypeScript
- Multer for file uploads
- CORS support

## Project Structure

```
├── frontend/                # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
│
└── backend/               # Backend Express application
    ├── src/
    │   ├── controllers/   # Request handlers
    │   ├── routes/        # API routes
    │   ├── middleware/    # Custom middleware
    │   ├── utils/         # Utility functions
    │   └── types/        # TypeScript type definitions
    ├── uploads/          # Document storage
    └── package.json      # Backend dependencies
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/faisal-aali/legal-doc-mgmt-test-task.git
cd legal-doc-mgmt-test-task
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Development

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

### Production Build

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Build the backend:
```bash
cd backend
npm run build
```

3. Start the production server:
```bash
cd backend
npm start
```

The production server will be served at http://localhost:4000

## API Endpoints

### Documents
- `POST /api/documents/:id/upload` - Upload a PDF document
- `GET /api/documents/:id/extractions` - Get text extractions for a document
- `GET /api/documents/:id` - Get document metadata

## Features in Detail

### Document Upload
- Supports PDF files
- File size validation
- Automatic document ID generation
- Progress indication

### Document Viewer
- PDF rendering with zoom support
- Page navigation
- Text extraction display
- Error handling for failed loads

### Text Extractions
- Displays extracted text by page
- Quick navigation to specific pages
- Error handling for failed extractions

## Error Handling

The application includes comprehensive error handling for:
- File upload failures
- PDF loading errors
- API communication issues
- Invalid file types
- Server errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.