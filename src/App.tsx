import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ApplicationTracker from './components/ApplicationTracker';
import RejectionLog from './components/RejectionLog';
import DocumentManager from './components/DocumentManager';
import Journal from './components/Journal';
import AIChat from './components/AIChat';
import { Application, Document, JournalEntry, RejectionEntry } from './types';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [applications, setApplications] = useState<Application[]>([]);
  const [rejections, setRejections] = useState<RejectionEntry[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedApplications = localStorage.getItem('jobSearchApps');
    const savedRejections = localStorage.getItem('jobSearchRejections');
    const savedDocuments = localStorage.getItem('jobSearchDocs');
    const savedJournal = localStorage.getItem('jobSearchJournal');

    if (savedApplications) setApplications(JSON.parse(savedApplications));
    if (savedRejections) setRejections(JSON.parse(savedRejections));
    if (savedDocuments) setDocuments(JSON.parse(savedDocuments));
    if (savedJournal) setJournalEntries(JSON.parse(savedJournal));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('jobSearchApps', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('jobSearchRejections', JSON.stringify(rejections));
  }, [rejections]);

  useEffect(() => {
    localStorage.setItem('jobSearchDocs', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('jobSearchJournal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <Dashboard 
            applications={applications}
            rejections={rejections}
            journalEntries={journalEntries}
            onSectionChange={setActiveSection}
          />
        );
      case 'applications':
        return (
          <ApplicationTracker 
            applications={applications}
            setApplications={setApplications}
          />
        );
      case 'rejections':
        return (
          <RejectionLog 
            rejections={rejections}
            setRejections={setRejections}
            applications={applications}
          />
        );
      case 'documents':
        return (
          <DocumentManager 
            documents={documents}
            setDocuments={setDocuments}
          />
        );
      case 'journal':
        return (
          <Journal 
            entries={journalEntries}
            setEntries={setJournalEntries}
          />
        );
      case 'ai-chat':
        return <AIChat applications={applications} documents={documents} />;
      default:
        return (
          <Dashboard 
            applications={applications}
            rejections={rejections}
            journalEntries={journalEntries}
            onSectionChange={setActiveSection}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        applicationCount={applications.length}
        documentCount={documents.length}
        journalCount={journalEntries.length}
        rejectionCount={rejections.length}
      />
      <main className="flex-1 overflow-hidden">
        {renderActiveSection()}
      </main>
    </div>
  );
}

export default App;