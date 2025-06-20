export interface Application {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'rejected' | 'offer' | 'withdrawn';
  appliedDate: string;
  salary?: string;
  location?: string;
  jobUrl?: string;
  notes?: string;
  lastUpdate: string;
  interviewDate?: string;
  followUpDate?: string;
  source?: 'naukri' | 'linkedin' | 'instahyre' | 'internshala' | 'angellist' | 'referral' | 'company-website' | 'other';
}

export interface Document {
  id: string;
  name: string;
  type: 'resume' | 'cover-letter';
  content: string;
  createdDate: string;
  lastModified: string;
  tags: string[];
  isDefault?: boolean;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'okay' | 'difficult' | 'tough';
  title: string;
  content: string;
  type: 'reflection' | 'rejection' | 'success' | 'milestone';
  applicationId?: string;
}

export interface RejectionEntry {
  id: string;
  company: string;
  role: string;
  date: string;
  rejectionReason?: string;
  learnings: string;
  applicationId?: string;
  aiResponse?: string;
  stage: 'application' | 'phone-screen' | 'technical' | 'final-round' | 'offer-stage';
  feedback?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}