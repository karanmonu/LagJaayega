import React, { useState, useEffect } from 'react';
import { X, Calendar, Heart, MessageSquare, Award, Target } from 'lucide-react';
import { JournalEntry } from '../types';

interface JournalModalProps {
  entry: JournalEntry | null;
  onSave: (entry: JournalEntry | Omit<JournalEntry, 'id'>) => void;
  onCancel: () => void;
}

const JournalModal: React.FC<JournalModalProps> = ({
  entry,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: 'okay' as JournalEntry['mood'],
    title: '',
    content: '',
    type: 'reflection' as JournalEntry['type'],
    applicationId: ''
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        date: entry.date,
        mood: entry.mood,
        title: entry.title,
        content: entry.content,
        type: entry.type,
        applicationId: entry.applicationId || ''
      });
    }
  }, [entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entryData = {
      ...formData,
      applicationId: formData.applicationId || undefined
    };

    if (entry) {
      onSave({ ...entryData, id: entry.id });
    } else {
      onSave(entryData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reflection': return <MessageSquare className="w-4 h-4" />;
      case 'rejection': return <Heart className="w-4 h-4" />;
      case 'success': return <Award className="w-4 h-4" />;
      case 'milestone': return <Target className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getPrompts = (type: string) => {
    switch (type) {
      case 'reflection':
        return [
          "What did I learn about myself today?",
          "What am I grateful for in my job search journey?",
          "What would I tell a friend in my situation?",
          "How have I grown through this experience?"
        ];
      case 'rejection':
        return [
          "This rejection doesn't define my worth or abilities",
          "What can I learn from this experience?",
          "How can I improve for next time?",
          "What positive feedback have I received recently?",
          "This is bringing me closer to the right opportunity"
        ];
      case 'success':
        return [
          "What specific actions led to this success?",
          "How can I replicate this positive outcome?",
          "Who helped me achieve this milestone?",
          "What skills did I demonstrate?"
        ];
      case 'milestone':
        return [
          "What progress have I made toward my goals?",
          "What challenges have I overcome?",
          "What new skills have I developed?",
          "How has my confidence grown?"
        ];
      default:
        return [];
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {entry ? 'Edit Journal Entry' : 'New Journal Entry'}
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
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-2">
                Mood {getMoodEmoji(formData.mood)}
              </label>
              <select
                id="mood"
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="great">🌟 Great</option>
                <option value="good">😊 Good</option>
                <option value="okay">😐 Okay</option>
                <option value="difficult">😔 Difficult</option>
                <option value="tough">😢 Tough</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
              {getTypeIcon(formData.type)}
              <span>Entry Type</span>
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="reflection">💭 Reflection</option>
              <option value="rejection">💔 Rejection Processing</option>
              <option value="success">🎉 Success & Wins</option>
              <option value="milestone">🎯 Milestone</option>
            </select>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Give your entry a meaningful title..."
            />
          </div>

          {/* Prompts */}
          {getPrompts(formData.type).length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">💡 Reflection Prompts:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                {getPrompts(formData.type).map((prompt, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{prompt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Your Thoughts *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Write freely about your thoughts, feelings, and experiences. This is your safe space to process emotions and reflect on your journey..."
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
              {entry ? 'Update Entry' : 'Save Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JournalModal;