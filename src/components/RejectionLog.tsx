import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Heart, 
  Edit3, 
  Trash2,
  Calendar,
  Building2,
  Lightbulb,
  MessageCircle,
  TrendingUp,
  Target,
  BookOpen,
  Filter
} from 'lucide-react';
import { RejectionEntry, Application } from '../types';
import RejectionModal from './RejectionModal';

interface RejectionLogProps {
  rejections: RejectionEntry[];
  setRejections: (rejections: RejectionEntry[]) => void;
  applications: Application[];
}

const RejectionLog: React.FC<RejectionLogProps> = ({
  rejections,
  setRejections,
  applications
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRejection, setEditingRejection] = useState<RejectionEntry | null>(null);

  const filteredRejections = rejections.filter(rejection => {
    const matchesSearch = 
      rejection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rejection.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rejection.learnings.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = stageFilter === 'all' || rejection.stage === stageFilter;
    
    return matchesSearch && matchesStage;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleAddRejection = (rejection: Omit<RejectionEntry, 'id'>) => {
    const newRejection: RejectionEntry = {
      ...rejection,
      id: Date.now().toString()
    };
    setRejections([...rejections, newRejection]);
    setIsModalOpen(false);
  };

  const handleEditRejection = (updatedRejection: RejectionEntry) => {
    setRejections(rejections.map(rejection => 
      rejection.id === updatedRejection.id ? updatedRejection : rejection
    ));
    setEditingRejection(null);
    setIsModalOpen(false);
  };

  const handleDeleteRejection = (id: string) => {
    if (window.confirm('Are you sure you want to delete this rejection entry?')) {
      setRejections(rejections.filter(rejection => rejection.id !== id));
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'application': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'phone-screen': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'technical': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'final-round': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'offer-stage': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'application': return 'Application';
      case 'phone-screen': return 'Phone Screen';
      case 'technical': return 'Technical Round';
      case 'final-round': return 'Final Round';
      case 'offer-stage': return 'Offer Stage';
      default: return 'Unknown';
    }
  };

  // Analytics
  const stageStats = rejections.reduce((acc, rejection) => {
    acc[rejection.stage] = (acc[rejection.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalRejections = rejections.length;
  const recentRejections = rejections.filter(r => {
    const rejectionDate = new Date(r.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return rejectionDate >= weekAgo;
  }).length;

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <Heart className="w-8 h-8 text-red-500" />
                <span>Rejection Pe Charcha</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Transform rejections into stepping stones. Every "no" brings you closer to your "yes" 💪
              </p>
            </div>
            <button
              onClick={() => {
                setEditingRejection(null);
                setIsModalOpen(true);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Log Rejection</span>
            </button>
          </div>

          {/* Stats */}
          {totalRejections > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Rejections</p>
                    <p className="text-2xl font-bold text-gray-900">{totalRejections}</p>
                  </div>
                  <BookOpen className="w-6 h-6 text-red-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-orange-600">{recentRejections}</p>
                  </div>
                  <Calendar className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Most Common Stage</p>
                    <p className="text-lg font-bold text-purple-600">
                      {Object.entries(stageStats).sort(([,a], [,b]) => b - a)[0]?.[0] 
                        ? getStageLabel(Object.entries(stageStats).sort(([,a], [,b]) => b - a)[0][0])
                        : 'N/A'}
                    </p>
                  </div>
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Growth Mindset</p>
                    <p className="text-lg font-bold text-green-600">Learning</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
          )}

          {/* Motivational Banner */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <Heart className="w-6 h-6 text-red-500 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Remember: Rejection ≠ Personal Worth
                </h3>
                <p className="text-gray-700 mb-3">
                  Every successful person has faced countless rejections. What matters is how you learn and grow from each experience.
                </p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">🎯 It's about fit, not worth</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">📈 Each rejection = valuable data</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">💪 You're building resilience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies, roles, or learnings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Stages</option>
                <option value="application">Application</option>
                <option value="phone-screen">Phone Screen</option>
                <option value="technical">Technical Round</option>
                <option value="final-round">Final Round</option>
                <option value="offer-stage">Offer Stage</option>
              </select>
            </div>
          </div>
        </div>

        {/* Rejections List */}
        {filteredRejections.length > 0 ? (
          <div className="space-y-6">
            {filteredRejections.map((rejection) => (
              <div key={rejection.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{rejection.role}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStageColor(rejection.stage)}`}>
                          {getStageLabel(rejection.stage)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Building2 className="w-4 h-4" />
                          <span>{rejection.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(rejection.date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {rejection.rejectionReason && (
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-700">Reason: </span>
                          <span className="text-sm text-gray-600">{rejection.rejectionReason}</span>
                        </div>
                      )}

                      {rejection.feedback && (
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-700">Feedback: </span>
                          <span className="text-sm text-gray-600">{rejection.feedback}</span>
                        </div>
                      )}

                      <div className="mb-4">
                        <div className="flex items-start space-x-2">
                          <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5" />
                          <div>
                            <span className="text-sm font-medium text-gray-700">Key Learnings:</span>
                            <p className="text-sm text-gray-600 mt-1">{rejection.learnings}</p>
                          </div>
                        </div>
                      </div>

                      {rejection.aiResponse && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start space-x-2">
                            <MessageCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                            <div>
                              <span className="text-sm font-medium text-blue-900">AI Mentor Says:</span>
                              <p className="text-sm text-blue-800 mt-1">{rejection.aiResponse}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingRejection(rejection);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit rejection entry"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRejection(rejection.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete rejection entry"
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
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || stageFilter !== 'all' ? 'No rejections match your filters' : 'No rejections logged yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || stageFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'When you face a rejection, log it here to learn and grow stronger'
              }
            </p>
            {!searchTerm && stageFilter === 'all' && (
              <button
                onClick={() => {
                  setEditingRejection(null);
                  setIsModalOpen(true);
                }}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
              >
                Log Your First Rejection
              </button>
            )}
          </div>
        )}

        {/* Rejection Modal */}
        {isModalOpen && (
          <RejectionModal
            rejection={editingRejection}
            applications={applications}
            onSave={editingRejection ? handleEditRejection : handleAddRejection}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingRejection(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RejectionLog;