import React from 'react';
import { 
  Briefcase, 
  FileText, 
  Calendar, 
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  Target,
  BookOpen,
  MessageCircle,
  Heart
} from 'lucide-react';
import { Application, JournalEntry, RejectionEntry } from '../types';

interface DashboardProps {
  applications: Application[];
  rejections: RejectionEntry[];
  journalEntries: JournalEntry[];
  onSectionChange: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  applications,
  rejections,
  journalEntries,
  onSectionChange
}) => {
  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === 'applied').length,
    interviews: applications.filter(app => app.status === 'interview').length,
    offers: applications.filter(app => app.status === 'offer').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  const recentApplications = applications
    .sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
    .slice(0, 5);

  const recentRejections = rejections
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const recentJournalEntries = journalEntries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'text-blue-600 bg-blue-50';
      case 'interview': return 'text-yellow-600 bg-yellow-50';
      case 'offer': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'withdrawn': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'great': return '🌟';
      case 'good': return '😊';
      case 'okay': return '😐';
      case 'difficult': return '😔';
      case 'tough': return '😢';
      default: return '😐';
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'application': return 'Application';
      case 'phone-screen': return 'Phone Screen';
      case 'technical': return 'Technical';
      case 'final-round': return 'Final Round';
      case 'offer-stage': return 'Offer Stage';
      default: return 'Unknown';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">
            Here's your job search progress and recent activity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applied</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-blue-600">{stats.applied}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.interviews}</p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Offers</p>
                <p className="text-3xl font-bold text-green-600">{stats.offers}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejections</p>
                <p className="text-3xl font-bold text-red-600">{rejections.length}</p>
              </div>
              <Heart className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.total > 0 ? Math.round(((stats.offers + stats.interviews) / stats.total) * 100) : 0}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                <button
                  onClick={() => onSectionChange('applications')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all →
                </button>
              </div>
            </div>
            <div className="p-6">
              {recentApplications.length > 0 ? (
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{app.position}</h3>
                        <p className="text-sm text-gray-600">{app.company}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Applied {new Date(app.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No applications yet</p>
                  <button
                    onClick={() => onSectionChange('applications')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Your First Application
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => onSectionChange('applications')}
                  className="w-full flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-700 font-medium">Add Application</span>
                </button>
                <button
                  onClick={() => onSectionChange('rejections')}
                  className="w-full flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Heart className="w-5 h-5 text-red-600" />
                  <span className="text-red-700 font-medium">Log Rejection</span>
                </button>
                <button
                  onClick={() => onSectionChange('documents')}
                  className="w-full flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Update Resume</span>
                </button>
                <button
                  onClick={() => onSectionChange('ai-chat')}
                  className="w-full flex items-center space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  <span className="text-purple-700 font-medium">Get AI Help</span>
                </button>
              </div>
            </div>

            {/* Recent Rejections */}
            {recentRejections.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Rejections</h2>
                    <button
                      onClick={() => onSectionChange('rejections')}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      View all →
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentRejections.map((rejection) => (
                      <div key={rejection.id} className="border-l-4 border-red-200 pl-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 text-sm">{rejection.role}</h4>
                          <span className="text-xs text-gray-500">at {rejection.company}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">
                          {getStageLabel(rejection.stage)} • {new Date(rejection.date).toLocaleDateString()}
                        </p>
                        {rejection.aiResponse && (
                          <p className="text-xs text-blue-600 italic">AI support provided</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Recent Journal Entries */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Reflections</h2>
                  <button
                    onClick={() => onSectionChange('journal')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View all →
                  </button>
                </div>
              </div>
              <div className="p-6">
                {recentJournalEntries.length > 0 ? (
                  <div className="space-y-4">
                    {recentJournalEntries.map((entry) => (
                      <div key={entry.id} className="border-l-4 border-blue-200 pl-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                          <h4 className="font-medium text-gray-900 text-sm">{entry.title}</h4>
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(entry.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <BookOpen className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm mb-3">Start journaling your journey</p>
                    <button
                      onClick={() => onSectionChange('journal')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Write First Entry
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;