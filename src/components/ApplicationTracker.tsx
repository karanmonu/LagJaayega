import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Building2,
  MapPin,
  ExternalLink,
  Edit3,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Target,
  Briefcase,
  Globe,
  BarChart3
} from 'lucide-react';
import { Application } from '../types';
import ApplicationModal from './ApplicationModal';

interface ApplicationTrackerProps {
  applications: Application[];
  setApplications: (applications: Application[]) => void;
}

const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  applications,
  setApplications
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || app.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleAddApplication = (application: Omit<Application, 'id'>) => {
    const newApp: Application = {
      ...application,
      id: Date.now().toString()
    };
    setApplications([...applications, newApp]);
    setIsModalOpen(false);
  };

  const handleEditApplication = (updatedApp: Application) => {
    setApplications(applications.map(app => 
      app.id === updatedApp.id ? updatedApp : app
    ));
    setEditingApplication(null);
    setIsModalOpen(false);
  };

  const handleDeleteApplication = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications(applications.filter(app => app.id !== id));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <Clock className="w-4 h-4" />;
      case 'interview': return <Calendar className="w-4 h-4" />;
      case 'offer': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'withdrawn': return <Target className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'interview': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'offer': return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'withdrawn': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
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
      case 'naukri': return 'Naukri';
      case 'linkedin': return 'LinkedIn';
      case 'instahyre': return 'Instahyre';
      case 'internshala': return 'Internshala';
      case 'angellist': return 'AngelList';
      case 'referral': return 'Referral';
      case 'company-website': return 'Company Site';
      case 'other': return 'Other';
      default: return 'Unknown';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'naukri': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'linkedin': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'instahyre': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'internshala': return 'text-green-600 bg-green-50 border-green-200';
      case 'angellist': return 'text-pink-600 bg-pink-50 border-pink-200';
      case 'referral': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      case 'company-website': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Source analytics
  const sourceStats = applications.reduce((acc, app) => {
    const source = app.source || 'other';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topSources = Object.entries(sourceStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Application Tracker</h1>
              <p className="text-gray-600">Manage and track all your job applications</p>
            </div>
            <button
              onClick={() => {
                setEditingApplication(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Application</span>
            </button>
          </div>

          {/* Source Analytics */}
          {applications.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Application Sources</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {topSources.map(([source, count]) => (
                  <div key={source} className="flex items-center space-x-2">
                    <span className="text-lg">{getSourceIcon(source)}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {getSourceLabel(source)}: {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies or positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
            <div className="relative">
              <Globe className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Sources</option>
                <option value="linkedin">LinkedIn</option>
                <option value="naukri">Naukri</option>
                <option value="instahyre">Instahyre</option>
                <option value="internshala">Internshala</option>
                <option value="angellist">AngelList</option>
                <option value="referral">Referral</option>
                <option value="company-website">Company Website</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        {filteredApplications.length > 0 ? (
          <div className="grid gap-6">
            {filteredApplications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{app.position}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          <span>{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
                        </span>
                        {app.source && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getSourceColor(app.source)}`}>
                            <span>{getSourceIcon(app.source)}</span>
                            <span>{getSourceLabel(app.source)}</span>
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Building2 className="w-4 h-4" />
                          <span>{app.company}</span>
                        </div>
                        {app.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{app.location}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Applied {new Date(app.appliedDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {app.salary && (
                        <div className="text-sm text-gray-600 mb-3">
                          <span className="font-medium">Salary:</span> {app.salary}
                        </div>
                      )}

                      {app.notes && (
                        <div className="text-sm text-gray-600 mb-3">
                          <span className="font-medium">Notes:</span> {app.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      {app.jobUrl && (
                        <a
                          href={app.jobUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View job posting"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => {
                          setEditingApplication(app);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit application"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteApplication(app.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete application"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Last updated: {new Date(app.lastUpdate).toLocaleDateString()}</span>
                      {app.followUpDate && (
                        <span>Follow up: {new Date(app.followUpDate).toLocaleDateString()}</span>
                      )}
                      {app.interviewDate && (
                        <span>Interview: {new Date(app.interviewDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' || sourceFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Start tracking your job applications to see your progress'
              }
            </p>
            <button
              onClick={() => {
                setEditingApplication(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Application
            </button>
          </div>
        )}

        {/* Application Modal */}
        {isModalOpen && (
          <ApplicationModal
            application={editingApplication}
            onSave={editingApplication ? handleEditApplication : handleAddApplication}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingApplication(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ApplicationTracker;