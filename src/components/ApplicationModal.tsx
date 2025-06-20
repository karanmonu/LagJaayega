import React, { useState, useEffect } from 'react';
import { X, Globe } from 'lucide-react';
import { Application } from '../types';

interface ApplicationModalProps {
  application: Application | null;
  onSave: (application: Application | Omit<Application, 'id'>) => void;
  onCancel: () => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  application,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'applied' as Application['status'],
    appliedDate: new Date().toISOString().split('T')[0],
    salary: '',
    location: '',
    jobUrl: '',
    notes: '',
    interviewDate: '',
    followUpDate: '',
    source: 'linkedin' as Application['source']
  });

  useEffect(() => {
    if (application) {
      setFormData({
        company: application.company,
        position: application.position,
        status: application.status,
        appliedDate: application.appliedDate,
        salary: application.salary || '',
        location: application.location || '',
        jobUrl: application.jobUrl || '',
        notes: application.notes || '',
        interviewDate: application.interviewDate || '',
        followUpDate: application.followUpDate || '',
        source: application.source || 'linkedin'
      });
    }
  }, [application]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const appData = {
      ...formData,
      lastUpdate: new Date().toISOString().split('T')[0],
      salary: formData.salary || undefined,
      location: formData.location || undefined,
      jobUrl: formData.jobUrl || undefined,
      notes: formData.notes || undefined,
      interviewDate: formData.interviewDate || undefined,
      followUpDate: formData.followUpDate || undefined,
      source: formData.source || undefined
    };

    if (application) {
      onSave({ ...appData, id: application.id });
    } else {
      onSave(appData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'naukri': return '🔍';
      case 'linkedin': return '💼';
      case 'instahyre': return '⚡';
      case 'internshala': return '🎓';
      case 'angellist': return '👼';
      case 'referral': return '🤝';
      case 'company-website': return '🏢';
      default: return '🌐';
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'naukri': return 'Naukri.com';
      case 'linkedin': return 'LinkedIn';
      case 'instahyre': return 'Instahyre';
      case 'internshala': return 'Internshala';
      case 'angellist': return 'AngelList';
      case 'referral': return 'Referral';
      case 'company-website': return 'Company Website';
      case 'other': return 'Other';
      default: return 'LinkedIn';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {application ? 'Edit Application' : 'Add New Application'}
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
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Company name"
              />
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                Position *
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Job title"
              />
            </div>

            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span>Job Source</span>
              </label>
              <select
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="linkedin">{getSourceIcon('linkedin')} LinkedIn</option>
                <option value="naukri">{getSourceIcon('naukri')} Naukri.com</option>
                <option value="instahyre">{getSourceIcon('instahyre')} Instahyre</option>
                <option value="internshala">{getSourceIcon('internshala')} Internshala</option>
                <option value="angellist">{getSourceIcon('angellist')} AngelList</option>
                <option value="referral">{getSourceIcon('referral')} Referral</option>
                <option value="company-website">{getSourceIcon('company-website')} Company Website</option>
                <option value="other">{getSourceIcon('other')} Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>

            <div>
              <label htmlFor="appliedDate" className="block text-sm font-medium text-gray-700 mb-2">
                Date Applied *
              </label>
              <input
                type="date"
                id="appliedDate"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., ₹8-12 LPA or $80k-100k"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City, State or Remote"
              />
            </div>

            <div>
              <label htmlFor="interviewDate" className="block text-sm font-medium text-gray-700 mb-2">
                Interview Date
              </label>
              <input
                type="date"
                id="interviewDate"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="followUpDate" className="block text-sm font-medium text-gray-700 mb-2">
                Follow Up Date
              </label>
              <input
                type="date"
                id="followUpDate"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="jobUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Job Posting URL
            </label>
            <input
              type="url"
              id="jobUrl"
              name="jobUrl"
              value={formData.jobUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Any additional notes about this application..."
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
              {application ? 'Update Application' : 'Add Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;