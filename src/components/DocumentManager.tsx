import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  Edit3, 
  Trash2, 
  Download,
  Copy,
  Star,
  Tag
} from 'lucide-react';
import { Document } from '../types';
import DocumentModal from './DocumentModal';

interface DocumentManagerProps {
  documents: Document[];
  setDocuments: (documents: Document[]) => void;
}

const DocumentManager: React.FC<DocumentManagerProps> = ({
  documents,
  setDocuments
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = typeFilter === 'all' || doc.type === typeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleAddDocument = (document: Omit<Document, 'id'>) => {
    const newDoc: Document = {
      ...document,
      id: Date.now().toString()
    };
    setDocuments([...documents, newDoc]);
    setIsModalOpen(false);
  };

  const handleEditDocument = (updatedDoc: Document) => {
    setDocuments(documents.map(doc => 
      doc.id === updatedDoc.id ? updatedDoc : doc
    ));
    setEditingDocument(null);
    setIsModalOpen(false);
  };

  const handleDeleteDocument = (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const handleToggleDefault = (id: string, type: 'resume' | 'cover-letter') => {
    setDocuments(documents.map(doc => ({
      ...doc,
      isDefault: doc.id === id && doc.type === type ? !doc.isDefault : 
                 (doc.type === type ? false : doc.isDefault)
    })));
  };

  const handleDownload = (document: Document) => {
    const blob = new Blob([document.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${document.name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };

  const getTypeColor = (type: string) => {
    return type === 'resume' 
      ? 'text-blue-600 bg-blue-50 border-blue-200' 
      : 'text-green-600 bg-green-50 border-green-200';
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
              <p className="text-gray-600">Manage your resumes and cover letters</p>
            </div>
            <button
              onClick={() => {
                setEditingDocument(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Document</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="resume">Resumes</option>
              <option value="cover-letter">Cover Letters</option>
            </select>
          </div>
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{doc.name}</h3>
                        {doc.isDefault && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(doc.type)}`}>
                        {doc.type === 'resume' ? 'Resume' : 'Cover Letter'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleToggleDefault(doc.id, doc.type)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title={doc.isDefault ? 'Remove as default' : 'Set as default'}
                    >
                      <Star className={`w-4 h-4 ${doc.isDefault ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                    </button>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <p>Created: {new Date(doc.createdDate).toLocaleDateString()}</p>
                    <p>Modified: {new Date(doc.lastModified).toLocaleDateString()}</p>
                  </div>

                  {doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {doc.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center space-x-1">
                          <Tag className="w-3 h-3" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {doc.content.substring(0, 150)}...
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCopyToClipboard(doc.content)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditingDocument(doc);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit document"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || typeFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Create your first resume or cover letter to get started'
              }
            </p>
            <button
              onClick={() => {
                setEditingDocument(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Document
            </button>
          </div>
        )}

        {/* Document Modal */}
        {isModalOpen && (
          <DocumentModal
            document={editingDocument}
            onSave={editingDocument ? handleEditDocument : handleAddDocument}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingDocument(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentManager;