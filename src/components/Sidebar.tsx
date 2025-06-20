import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  BookOpen, 
  MessageCircle,
  Target,
  TrendingUp,
  Heart
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  applicationCount: number;
  documentCount: number;
  journalCount: number;
  rejectionCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
  applicationCount,
  documentCount,
  journalCount,
  rejectionCount
}) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      count: null
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: Briefcase,
      count: applicationCount
    },
    {
      id: 'rejections',
      label: 'Rejection Pe Charcha',
      icon: Heart,
      count: rejectionCount
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      count: documentCount
    },
    {
      id: 'journal',
      label: 'Journal',
      icon: BookOpen,
      count: journalCount
    },
    {
      id: 'ai-chat',
      label: 'AI Mentor',
      icon: MessageCircle,
      count: null
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">JobFlow</h1>
            <p className="text-xs text-gray-500">Your Career Companion</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count !== null && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <TrendingUp className="w-4 h-4" />
          <span>Stay consistent, stay strong</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;