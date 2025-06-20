import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  BookOpen, 
  Edit3, 
  Trash2,
  Calendar,
  Heart,
  Award,
  Target,
  MessageSquare
} from 'lucide-react';
import { JournalEntry } from '../types';
import JournalModal from './JournalModal';

interface JournalProps {
  entries: JournalEntry[];
  setEntries: (entries: JournalEntry[]) => void;
}

const Journal: React.FC<JournalProps> = ({
  entries,
  setEntries
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [moodFilter, setMoodFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || entry.type === typeFilter;
    const matchesMood = moodFilter === 'all' || entry.mood === moodFilter;
    
    return matchesSearch && matchesType && matchesMood;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleAddEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setEntries([...entries, newEntry]);
    setIsModalOpen(false);
  };

  const handleEditEntry = (updatedEntry: JournalEntry) => {
    setEntries(entries.map(entry => 
      entry.id === updatedEntry.id ? updatedEntry : entry
    ));
    setEditingEntry(null);
    setIsModalOpen(false);
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      setEntries(entries.filter(entry => entry.id !== id));
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

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'great': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'okay': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'difficult': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'tough': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reflection': return <MessageSquare className="w-4 h-4" />;
      case 'rejection': return <Heart className="w-4 h-4" />;
      case 'success': return <Award className="w-4 h-4" />;
      case 'milestone': return <Target className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reflection': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'rejection': return 'text-red-600 bg-red-50 border-red-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'milestone': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Journal</h1>
              <p className="text-gray-600">Reflect on your journey and build emotional resilience</p>
            </div>
            <button
              onClick={() => {
                setEditingEntry(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Entry</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search your entries..."
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
              <option value="reflection">Reflections</option>
              <option value="rejection">Rejections</option>
              <option value="success">Successes</option>
              <option value="milestone">Milestones</option>
            </select>
            <select
              value={moodFilter}
              onChange={(e) => setMoodFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Moods</option>
              <option value="great">Great</option>
              <option value="good">Good</option>
              <option value="okay">Okay</option>
              <option value="difficult">Difficult</option>
              <option value="tough">Tough</option>
            </select>
          </div>
        </div>

        {/* Encouragement Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">💪 Stay Strong</h3>
          <p className="text-gray-700">
            Job searching is a journey with ups and downs. Each rejection is a step closer to the right opportunity. 
            Use this journal to process your emotions, celebrate wins, and maintain perspective.
          </p>
        </div>

        {/* Journal Entries */}
        {filteredEntries.length > 0 ? (
          <div className="space-y-6">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                        <h3 className="text-xl font-semibold text-gray-900">{entry.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getTypeColor(entry.type)}`}>
                          {getTypeIcon(entry.type)}
                          <span>{entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(entry.date).toLocaleDateString()}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getMoodColor(entry.mood)}`}>
                          Mood: {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                        </span>
                      </div>

                      <div className="prose prose-sm max-w-none">
                        <p className="text-gray-700 whitespace-pre-line">{entry.content}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingEntry(entry);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit entry"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete entry"
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
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No journal entries found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || typeFilter !== 'all' || moodFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Start documenting your job search journey to build emotional resilience'
              }
            </p>
            <button
              onClick={() => {
                setEditingEntry(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Write Your First Entry
            </button>
          </div>
        )}

        {/* Journal Modal */}
        {isModalOpen && (
          <JournalModal
            entry={editingEntry}
            onSave={editingEntry ? handleEditEntry : handleAddEntry}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingEntry(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Journal;