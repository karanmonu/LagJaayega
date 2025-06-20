import React, { useState, useEffect } from 'react';
import { X, Tag } from 'lucide-react';
import { Document } from '../types';

interface DocumentModalProps {
  document: Document | null;
  onSave: (document: Document | Omit<Document, 'id'>) => void;
  onCancel: () => void;
}

const DocumentModal: React.FC<DocumentModalProps> = ({
  document,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'resume' as Document['type'],
    content: '',
    tags: [] as string[],
    isDefault: false
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (document) {
      setFormData({
        name: document.name,
        type: document.type,
        content: document.content,
        tags: document.tags,
        isDefault: document.isDefault || false
      });
    }
  }, [document]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const docData = {
      ...formData,
      createdDate: document?.createdDate || new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    if (document) {
      onSave({ ...docData, id: document.id });
    } else {
      onSave(docData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {document ? 'Edit Document' : 'Create New Document'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Document Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Senior Developer Resume"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Document Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="resume">Resume</option>
                <option value="cover-letter">Cover Letter</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add tags (press Enter to add)"
            />
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
              Set as default {formData.type === 'resume' ? 'resume' : 'cover letter'}
            </label>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              placeholder={formData.type === 'resume' 
                ? "Enter your resume content here...\n\nExample:\nJohn Doe\nSoftware Engineer\nemail@example.com\n\nEXPERIENCE\n• Senior Developer at TechCorp (2020-2023)\n• Built scalable web applications...\n\nSKILLS\n• JavaScript, React, Node.js\n• Python, Django\n• AWS, Docker"
                : "Enter your cover letter content here...\n\nExample:\nDear Hiring Manager,\n\nI am writing to express my interest in the [Position] role at [Company]. With [X years] of experience in [field], I am confident that I would be a valuable addition to your team.\n\n[Body paragraphs highlighting relevant experience and skills]\n\nThank you for your consideration.\n\nSincerely,\n[Your Name]"
              }
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              {document ? 'Update Document' : 'Create Document'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentModal;