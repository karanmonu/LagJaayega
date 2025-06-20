import React, { useState, useEffect } from 'react';
import { X, Building2, Calendar, Lightbulb, MessageCircle, Sparkles } from 'lucide-react';
import { RejectionEntry, Application } from '../types';

interface RejectionModalProps {
  rejection: RejectionEntry | null;
  applications: Application[];
  onSave: (rejection: RejectionEntry | Omit<RejectionEntry, 'id'>) => void;
  onCancel: () => void;
}

const RejectionModal: React.FC<RejectionModalProps> = ({
  rejection,
  applications,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    date: new Date().toISOString().split('T')[0],
    stage: 'application' as RejectionEntry['stage'],
    rejectionReason: '',
    feedback: '',
    learnings: '',
    applicationId: ''
  });
  const [aiResponse, setAiResponse] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  useEffect(() => {
    if (rejection) {
      setFormData({
        company: rejection.company,
        role: rejection.role,
        date: rejection.date,
        stage: rejection.stage,
        rejectionReason: rejection.rejectionReason || '',
        feedback: rejection.feedback || '',
        learnings: rejection.learnings,
        applicationId: rejection.applicationId || ''
      });
      setAiResponse(rejection.aiResponse || '');
    }
  }, [rejection]);

  const generateAIResponse = () => {
    setIsGeneratingAI(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const responses = getAIResponses(formData.stage, formData.rejectionReason, formData.company);
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiResponse(randomResponse);
      setIsGeneratingAI(false);
    }, 1500 + Math.random() * 1000);
  };

  const getAIResponses = (stage: string, reason: string, company: string) => {
    const baseResponses = [
      `Hey, I know this stings right now, but you're doing amazing by putting yourself out there. ${company} missing out on you is their loss, not your failure. 💪`,
      
      `This rejection doesn't define your worth or capabilities. You're building resilience with every application, and that's a superpower in itself. Keep going! 🌟`,
      
      `I see you're learning and growing from each experience - that's exactly what successful people do. This 'no' is just redirecting you to your perfect 'yes'. ❤️`,
      
      `You know what? Every rejection is valuable data. You're not just job hunting, you're market researching and skill building. That's incredibly smart! 🎯`,
      
      `The fact that you're reflecting on this shows incredible emotional intelligence. Companies need people like you who can learn and adapt. Your time will come! 🚀`
    ];

    const stageSpecificResponses = {
      'application': [
        `Getting rejected at the application stage often means it's about fit or timing, not your qualifications. Consider tailoring your applications more specifically to each role. 📝`,
        
        `Application rejections are tough because they feel impersonal. But remember - you're playing a numbers game here. Keep applying, keep improving your resume. 💼`,
        
        `This early-stage rejection might mean your resume needs some tweaking. Have you tried using keywords from the job description? Small changes can make big differences! ✨`
      ],
      
      'phone-screen': [
        `Making it to a phone screen means they liked your profile! This rejection is about communication style or specific requirements. Practice your elevator pitch and you'll nail the next one. 📞`,
        
        `Phone screen rejections often come down to communication clarity or cultural fit questions. Consider preparing stories that showcase both your skills and personality. 🗣️`,
        
        `You got their attention enough for a call - that's already a win! Use this experience to refine how you talk about your experience and ask better questions. 🎤`
      ],
      
      'technical': [
        `Technical rejections are learning goldmines! They show you exactly what skills to focus on. Use this feedback to level up - you're closer than you think. 💻`,
        
        `Technical rounds are tough, but getting there means your profile is strong. Brush up on the areas they tested and you'll be unstoppable next time. 🔧`,
        
        `Every technical interview makes you better at the next one. Consider this expensive (free!) training. Document what you learned and practice those concepts. 📚`
      ],
      
      'final-round': [
        `Final round rejections hurt the most, but they also mean you're SO close to landing something great. You're clearly interview-ready - it's just about finding the right match. 🎯`,
        
        `Making it to final rounds consistently? You're in the top tier of candidates. This is about perfect fit now, not your abilities. Your offer is coming soon! 🏆`,
        
        `Final round means they seriously considered you. That's huge! Sometimes it comes down to tiny details or internal factors you can't control. Stay confident! ⭐`
      ],
      
      'offer-stage': [
        `An offer-stage rejection is incredibly rare and usually about budget or internal changes, not you. This actually validates that you're offer-worthy. The next one will stick! 💎`,
        
        `Wow, you made it all the way to offer discussions! That's incredible validation of your skills. This rejection is definitely about them, not you. Keep this confidence! 👑`,
        
        `Offer-stage rejections are the universe protecting you from the wrong opportunity. Something better is coming, and you now know you're at offer level! 🌈`
      ]
    };

    const reasonSpecificResponses = {
      'overqualified': [
        `"Overqualified" often means they're worried you'll leave for something better. Consider emphasizing your genuine interest in the role and company mission. 🎯`,
        
        `Being "overqualified" is a good problem to have! It means you're impressive. Maybe target slightly more senior roles or emphasize your long-term interest. 📈`
      ],
      
      'underqualified': [
        `"Underqualified" feedback is actually a roadmap for growth. Focus on building those specific skills they mentioned - you know exactly what to work on now! 📚`,
        
        `Don't let "underqualified" discourage you. Sometimes it's about presentation, not actual skills. Consider how you're showcasing your experience. ✨`
      ],
      
      'cultural fit': [
        `"Cultural fit" rejections protect you from unhappy work environments. You want to work somewhere that appreciates who you are authentically. 🏠`,
        
        `Cultural fit is subjective and goes both ways. This rejection might have saved you from a workplace where you wouldn't thrive. Trust the process! 🤝`
      ],
      
      'budget': [
        `Budget constraints are completely outside your control. This rejection validates that they wanted you but couldn't afford you. That's actually flattering! 💰`,
        
        `Budget rejections mean you're pricing yourself appropriately and they recognized your value. Don't lower your worth - find companies that can afford talent! 💎`
      ]
    };

    let responses = [...baseResponses];
    
    if (stageSpecificResponses[stage]) {
      responses = [...responses, ...stageSpecificResponses[stage]];
    }
    
    const reasonLower = reason.toLowerCase();
    Object.keys(reasonSpecificResponses).forEach(key => {
      if (reasonLower.includes(key)) {
        responses = [...responses, ...reasonSpecificResponses[key]];
      }
    });

    // Add some strategic advice
    const strategicAdvice = [
      `💡 Strategy tip: Try focusing on startups this week - they often move faster and value potential over perfect fit.`,
      
      `💡 Strategy tip: Consider reaching out to your network. Referrals have much higher success rates than cold applications.`,
      
      `💡 Strategy tip: Look for companies that are actively hiring (check their careers page for multiple openings) - they're more likely to say yes.`,
      
      `💡 Strategy tip: Try applying to companies that have recently received funding - they're usually in growth mode and hiring actively.`,
      
      `💡 Strategy tip: Consider smaller companies or scale-ups. They often offer more growth opportunities and are less rigid in their requirements.`
    ];

    responses = [...responses, ...strategicAdvice];

    return responses;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const rejectionData = {
      ...formData,
      aiResponse: aiResponse || undefined,
      rejectionReason: formData.rejectionReason || undefined,
      feedback: formData.feedback || undefined,
      applicationId: formData.applicationId || undefined
    };

    if (rejection) {
      onSave({ ...rejectionData, id: rejection.id });
    } else {
      onSave(rejectionData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplicationSelect = (applicationId: string) => {
    const selectedApp = applications.find(app => app.id === applicationId);
    if (selectedApp) {
      setFormData(prev => ({
        ...prev,
        applicationId,
        company: selectedApp.company,
        role: selectedApp.position
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {rejection ? 'Edit Rejection Entry' : 'Log New Rejection'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Link to existing application */}
          {applications.length > 0 && (
            <div>
              <label htmlFor="applicationId" className="block text-sm font-medium text-gray-700 mb-2">
                Link to Application (Optional)
              </label>
              <select
                id="applicationId"
                name="applicationId"
                value={formData.applicationId}
                onChange={(e) => handleApplicationSelect(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select an application...</option>
                {applications.map(app => (
                  <option key={app.id} value={app.id}>
                    {app.position} at {app.company}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                <Building2 className="w-4 h-4" />
                <span>Company *</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Company name"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Job title"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Rejection Date *</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Stage *
              </label>
              <select
                id="stage"
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="application">Application Review</option>
                <option value="phone-screen">Phone Screen</option>
                <option value="technical">Technical Round</option>
                <option value="final-round">Final Round</option>
                <option value="offer-stage">Offer Stage</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700 mb-2">
              Reason Given (Optional)
            </label>
            <input
              type="text"
              id="rejectionReason"
              name="rejectionReason"
              value={formData.rejectionReason}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="e.g., overqualified, cultural fit, budget constraints..."
            />
          </div>

          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
              Specific Feedback (Optional)
            </label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Any specific feedback they provided..."
            />
          </div>

          <div>
            <label htmlFor="learnings" className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
              <Lightbulb className="w-4 h-4" />
              <span>Key Learnings *</span>
            </label>
            <textarea
              id="learnings"
              name="learnings"
              value={formData.learnings}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="What did you learn from this experience? How will you improve for next time?"
            />
          </div>

          {/* AI Response Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700 flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>AI Mentor Response</span>
              </label>
              <button
                type="button"
                onClick={generateAIResponse}
                disabled={isGeneratingAI}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>{isGeneratingAI ? 'Generating...' : 'Get AI Support'}</span>
              </button>
            </div>
            
            {isGeneratingAI ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-blue-700">Your AI mentor is crafting a thoughtful response...</span>
                </div>
              </div>
            ) : aiResponse ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">{aiResponse}</p>
                <button
                  type="button"
                  onClick={generateAIResponse}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-700 underline"
                >
                  Generate different response
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-2">Get personalized encouragement and strategic advice</p>
                <button
                  type="button"
                  onClick={generateAIResponse}
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Click "Get AI Support" above
                </button>
              </div>
            )}
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
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors"
            >
              {rejection ? 'Update Entry' : 'Log Rejection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectionModal;