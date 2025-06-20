import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  FileText, 
  Briefcase,
  Heart,
  Sparkles,
  Building2,
  Code,
  Target
} from 'lucide-react';
import { Application, Document, ChatMessage } from '../types';

interface AIChatProps {
  applications: Application[];
  documents: Document[];
}

const AIChat: React.FC<AIChatProps> = ({ applications, documents }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Namaste! 🙏 I'm your AI career mentor with deep knowledge of the Indian job market. I can help you tailor resumes for companies like TCS, Infosys, Flipkart, Razorpay, and more. I understand what Indian recruiters look for - from DSA skills for service companies to product thinking for startups. How can I help you today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickPrompts = [
    {
      icon: <Building2 className="w-4 h-4" />,
      text: "Tailor for TCS/Infosys",
      prompt: "Help me tailor my resume for TCS or Infosys. What should I emphasize for service-based companies?"
    },
    {
      icon: <Code className="w-4 h-4" />,
      text: "Optimize for startups",
      prompt: "I want to apply to Indian startups like Razorpay, Zomato, or Swiggy. How should I position my resume?"
    },
    {
      icon: <Target className="w-4 h-4" />,
      text: "Product company prep",
      prompt: "Help me prepare for product companies like Flipkart, Amazon India, or Microsoft India."
    },
    {
      icon: <Heart className="w-4 h-4" />,
      text: "Fresher guidance",
      prompt: "I'm a fresher looking for my first job in India. What should my resume focus on?"
    }
  ];

  const getIndianCompanyAdvice = (company: string, userMessage: string): string => {
    const companyLower = company.toLowerCase();
    
    // Service-based companies (TCS, Infosys, Wipro, HCL, Tech Mahindra, Cognizant)
    if (['tcs', 'infosys', 'wipro', 'hcl', 'tech mahindra', 'cognizant', 'accenture', 'capgemini'].some(c => companyLower.includes(c))) {
      return `🏢 **Service Company Strategy for ${company}:**

**Technical Skills to Highlight:**
• **Programming Languages:** Java, Python, C++, JavaScript (mention proficiency levels)
• **DSA Fundamentals:** Arrays, Linked Lists, Trees, Sorting, Searching algorithms
• **Database Skills:** SQL, MySQL, Oracle (very important for service companies)
• **Web Technologies:** HTML, CSS, JavaScript, basic frameworks
• **Testing Knowledge:** Manual testing, basic automation concepts

**Resume Structure for Service Companies:**
• **Academic Performance:** Mention your 10th, 12th, and graduation percentages (they care about this!)
• **Certifications:** Any relevant technical certifications (Oracle, Microsoft, etc.)
• **Projects:** Focus on end-to-end projects showing problem-solving
• **Soft Skills:** Communication, teamwork, adaptability (crucial for client-facing roles)

**Key Points to Emphasize:**
• Willingness to learn new technologies
• Strong foundation in computer science fundamentals
• Any exposure to client interaction or presentation skills
• Mention if you're comfortable with rotational assignments

**Avoid:**
• Overemphasizing cutting-edge technologies they might not use
• Focusing too much on startup-style rapid prototyping
• Neglecting to mention academic achievements

**Sample Achievement Format:**
"Developed a library management system using Java and MySQL, demonstrating strong DSA concepts and database design principles"`;
    }

    // Product companies (Flipkart, Amazon, Microsoft, Google, etc.)
    if (['flipkart', 'amazon', 'microsoft', 'google', 'uber', 'ola', 'paytm', 'phonepe'].some(c => companyLower.includes(c))) {
      return `🚀 **Product Company Strategy for ${company}:**

**Technical Excellence Focus:**
• **Advanced DSA:** Complex algorithms, system design basics, time/space complexity
• **System Design:** Scalability, microservices, distributed systems concepts
• **Modern Tech Stack:** React, Node.js, Python, Go, cloud technologies (AWS/Azure)
• **Problem-Solving:** LeetCode-style problems, competitive programming experience

**Resume Structure for Product Companies:**
• **Impact-Driven Projects:** Show scale, users affected, performance improvements
• **Open Source Contributions:** GitHub profile, contributions to popular projects
• **Technical Depth:** Deep dive into technologies rather than breadth
• **Quantified Achievements:** "Improved performance by 40%", "Handled 10K+ users"

**${company}-Specific Tips:**
${companyLower.includes('flipkart') ? '• E-commerce domain knowledge, inventory management, payment systems\n• Experience with high-traffic applications\n• Understanding of Indian market dynamics' : ''}
${companyLower.includes('amazon') ? '• Cloud technologies (AWS), scalability challenges\n• Customer obsession mindset in project descriptions\n• Experience with large-scale distributed systems' : ''}
${companyLower.includes('microsoft') ? '• Enterprise software experience, .NET technologies\n• Productivity tools, collaboration software\n• Cross-platform development experience' : ''}

**Key Differentiators:**
• Demonstrate ownership and end-to-end thinking
• Show ability to work with ambiguous requirements
• Highlight any experience with A/B testing, analytics
• Mention any experience with agile methodologies

**Sample Achievement Format:**
"Built a real-time chat application serving 1000+ concurrent users, implementing WebSocket connections and Redis caching, resulting in 99.9% uptime"`;
    }

    // Fintech companies (Razorpay, Paytm, PhonePe, Cred, etc.)
    if (['razorpay', 'paytm', 'phonepe', 'cred', 'zerodha', 'groww', 'policybazaar'].some(c => companyLower.includes(c))) {
      return `💳 **Fintech Strategy for ${company}:**

**Domain-Specific Skills:**
• **Security Focus:** Understanding of encryption, secure coding practices
• **Payment Systems:** Knowledge of UPI, payment gateways, banking APIs
• **Compliance Awareness:** Basic understanding of financial regulations
• **Data Analytics:** Experience with financial data, fraud detection concepts

**Technical Skills for Fintech:**
• **Backend Technologies:** Node.js, Python, Java for robust financial systems
• **Database Expertise:** PostgreSQL, MongoDB for transaction handling
• **API Development:** RESTful services, webhook implementations
• **Security Tools:** JWT, OAuth, basic cryptography concepts

**${company}-Specific Focus:**
${companyLower.includes('razorpay') ? '• Payment gateway integration experience\n• B2B product understanding\n• API-first development approach' : ''}
${companyLower.includes('paytm') ? '• Consumer-facing app experience\n• Wallet and payment systems\n• Super-app ecosystem understanding' : ''}
${companyLower.includes('zerodha') ? '• Trading platform concepts\n• Real-time data processing\n• Financial market understanding' : ''}

**Resume Highlights:**
• Any projects involving money/transaction handling
• Experience with third-party API integrations
• Understanding of user verification and KYC processes
• Mention any personal finance or trading app projects

**Soft Skills for Fintech:**
• Attention to detail (financial accuracy is crucial)
• Risk awareness and mitigation thinking
• Customer trust and security mindset

**Sample Project Description:**
"Developed a personal expense tracker with bank API integration, implementing secure transaction categorization and budget alerts for 500+ users"`;
    }

    // E-commerce and food delivery (Zomato, Swiggy, BigBasket, etc.)
    if (['zomato', 'swiggy', 'bigbasket', 'grofers', 'blinkit', 'dunzo'].some(c => companyLower.includes(c))) {
      return `🍕 **Consumer Tech Strategy for ${company}:**

**Consumer-Focused Skills:**
• **Mobile Development:** React Native, Flutter, or native iOS/Android
• **Real-time Systems:** Live tracking, notifications, real-time updates
• **Location Services:** Maps integration, geolocation, routing algorithms
• **Performance Optimization:** App performance, loading times, offline capabilities

**Domain Understanding:**
• **Logistics & Supply Chain:** Understanding of delivery optimization
• **Consumer Behavior:** A/B testing, user analytics, conversion funnels
• **Marketplace Dynamics:** Two-sided marketplace concepts (restaurants + customers)
• **Operational Excellence:** Inventory management, demand forecasting

**${company}-Specific Insights:**
${companyLower.includes('zomato') ? '• Restaurant discovery and recommendation systems\n• Review and rating mechanisms\n• Food delivery logistics optimization' : ''}
${companyLower.includes('swiggy') ? '• Hyperlocal delivery systems\n• Dynamic pricing algorithms\n• Multi-category marketplace (food, grocery, etc.)' : ''}

**Technical Stack Preferences:**
• **Frontend:** React, React Native for cross-platform development
• **Backend:** Node.js, Python, microservices architecture
• **Databases:** Redis for caching, PostgreSQL for transactions
• **Analytics:** Experience with user tracking, conversion metrics

**Project Ideas to Highlight:**
• Food delivery or e-commerce applications
• Location-based services or mapping projects
• Real-time tracking or notification systems
• Any consumer-facing mobile applications

**Sample Achievement:**
"Built a food delivery app with real-time order tracking, serving 200+ users with 95% on-time delivery rate through optimized routing algorithms"`;
    }

    // Edtech companies (BYJU'S, Unacademy, Vedantu, etc.)
    if (['byjus', 'unacademy', 'vedantu', 'toppr', 'whitehat jr'].some(c => companyLower.includes(c))) {
      return `📚 **EdTech Strategy for ${company}:**

**Education-Focused Skills:**
• **Content Management:** Video streaming, content delivery networks
• **Learning Analytics:** Progress tracking, adaptive learning algorithms
• **Interactive Features:** Quizzes, assessments, gamification
• **Accessibility:** Multi-language support, offline capabilities

**Technical Requirements:**
• **Video Technology:** Streaming protocols, video compression, live streaming
• **Mobile-First:** Most learning happens on mobile devices
• **Scalability:** Handling large number of concurrent users (especially during exams)
• **Analytics:** Learning pattern analysis, engagement metrics

**Domain Knowledge:**
• Understanding of Indian education system
• Familiarity with different learning styles and age groups
• Knowledge of assessment and evaluation methods
• Awareness of regional language requirements

**Key Projects to Highlight:**
• Educational apps or learning management systems
• Video streaming or content delivery projects
• Quiz or assessment platforms
• Any projects involving data analytics or user engagement

**Sample Description:**
"Developed an online quiz platform with adaptive difficulty, serving 1000+ students with personalized learning paths and 85% completion rate"`;
    }

    // Default advice for other Indian companies
    return `🇮🇳 **General Indian Company Strategy:**

**Universal Indian Market Skills:**
• **Communication:** English proficiency, presentation skills
• **Adaptability:** Ability to work across different time zones (for global clients)
• **Cultural Awareness:** Understanding of diverse Indian market needs
• **Cost Consciousness:** Efficient, scalable solutions

**Technical Foundation:**
• Strong computer science fundamentals
• Problem-solving and analytical thinking
• Ability to learn new technologies quickly
• Experience with popular Indian tech stacks

**Resume Tips for Indian Market:**
• Include academic percentages (10th, 12th, graduation)
• Mention any relevant certifications
• Highlight projects with real-world applications
• Show progression and learning mindset
• Include any leadership or extracurricular activities

**Soft Skills Valued in India:**
• Team collaboration and respect for hierarchy
• Willingness to take on diverse responsibilities
• Strong work ethic and commitment
• Cultural sensitivity and inclusiveness

Would you like me to provide more specific advice for a particular company or role type?`;
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific Indian companies
    const indianCompanies = [
      'tcs', 'infosys', 'wipro', 'hcl', 'tech mahindra', 'cognizant', 'accenture',
      'flipkart', 'amazon', 'microsoft', 'google', 'uber', 'ola',
      'razorpay', 'paytm', 'phonepe', 'cred', 'zerodha', 'groww',
      'zomato', 'swiggy', 'bigbasket', 'blinkit', 'dunzo',
      'byjus', 'unacademy', 'vedantu', 'toppr'
    ];

    const mentionedCompany = indianCompanies.find(company => 
      lowerMessage.includes(company) || lowerMessage.includes(company.replace(' ', ''))
    );

    if (mentionedCompany) {
      return getIndianCompanyAdvice(mentionedCompany, userMessage);
    }

    // Resume-related responses with Indian context
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      const resumeCount = documents.filter(doc => doc.type === 'resume').length;
      return `🇮🇳 **Indian Resume Optimization Guide:**

**Essential Sections for Indian Market:**
• **Personal Details:** Name, phone, email, LinkedIn (include city)
• **Professional Summary:** 2-3 lines highlighting your value proposition
• **Technical Skills:** Categorized by proficiency (Expert/Intermediate/Beginner)
• **Experience/Projects:** Focus on impact and technologies used
• **Education:** Include percentages for 10th, 12th, and graduation
• **Certifications:** Any relevant technical or professional certifications

**Indian-Specific Resume Tips:**
• **Academic Performance:** Indian recruiters value academic scores
• **Technical Depth:** Show progression from basic to advanced technologies
• **Project Impact:** Quantify results wherever possible
• **Language Skills:** Mention English proficiency and any regional languages
• **Location Flexibility:** Indicate willingness to relocate if applicable

**Format Preferences:**
• Keep it to 1-2 pages maximum
• Use clean, professional formatting
• Include a professional photo (optional but common)
• Use bullet points for easy scanning
• Ensure ATS-friendly formatting

**Common Mistakes to Avoid:**
• Don't include irrelevant personal details (marital status, etc.)
• Avoid fancy graphics that ATS systems can't read
• Don't use overly casual language
• Don't forget to proofread for grammar and spelling

**For Different Experience Levels:**
${resumeCount > 0 ? `I can see you have ${resumeCount} resume${resumeCount > 1 ? 's' : ''} saved. ` : ''}

**Freshers (0-2 years):**
• Emphasize academic projects and internships
• Include relevant coursework and certifications
• Highlight coding competitions or hackathons
• Show learning agility and passion for technology

**Experienced (2+ years):**
• Lead with professional experience
• Show career progression and increasing responsibilities
• Include specific achievements and metrics
• Demonstrate leadership and mentoring experience

Which specific company or role type are you targeting? I can provide more tailored advice!`;
    }

    // Cover letter help with Indian context
    if (lowerMessage.includes('cover letter')) {
      return `📝 **Indian Cover Letter Strategy:**

**Structure for Indian Companies:**
1. **Professional Greeting:** "Dear Hiring Manager" or specific name if known
2. **Strong Opening:** Mention the role and how you learned about it
3. **Value Proposition:** Connect your skills to their specific needs
4. **Cultural Fit:** Show understanding of company values and Indian market
5. **Professional Closing:** Express enthusiasm and next steps

**Indian Market Considerations:**
• **Respect and Formality:** Use professional language throughout
• **Company Research:** Show knowledge of their Indian operations/market
• **Local Context:** Understand their challenges in the Indian market
• **Growth Mindset:** Emphasize learning and adaptation abilities

**For Different Company Types:**

**Service Companies (TCS, Infosys):**
• Emphasize reliability, process orientation, and client focus
• Mention willingness to work on diverse projects
• Highlight communication skills and team collaboration

**Product Companies (Flipkart, Amazon India):**
• Show innovation and problem-solving abilities
• Demonstrate understanding of Indian consumer behavior
• Emphasize technical depth and scalability thinking

**Startups (Razorpay, Zomato):**
• Highlight adaptability and wearing multiple hats
• Show entrepreneurial mindset and ownership
• Demonstrate ability to work in fast-paced environments

**Sample Opening for Indian Context:**
"I am writing to express my strong interest in the [Position] role at [Company]. Having followed [Company]'s journey in transforming the Indian [industry] landscape, I am excited about the opportunity to contribute to your mission of [company mission]."

**Key Phrases for Indian Market:**
• "Understanding of Indian market dynamics"
• "Experience working with diverse teams"
• "Commitment to continuous learning"
• "Passion for solving real-world problems"

Would you like me to help you craft a cover letter for a specific Indian company?`;
    }

    // Fresher-specific guidance
    if (lowerMessage.includes('fresher') || lowerMessage.includes('first job') || lowerMessage.includes('campus')) {
      return `🎓 **Fresher's Guide to Indian Job Market:**

**Resume Strategy for Freshers:**
• **Academic Excellence:** Highlight your CGPA/percentage if it's good (>7.5/75%)
• **Technical Projects:** 3-4 substantial projects showing different skills
• **Internships:** Any internship experience, even if short-term
• **Certifications:** Online courses from Coursera, Udemy, or Indian platforms
• **Coding Profiles:** Include HackerRank, LeetCode, GeeksforGeeks profiles

**Essential Skills for Indian Market:**
• **Programming Languages:** Java, Python, C++ (at least 2 languages)
• **Web Development:** HTML, CSS, JavaScript, one framework (React/Angular)
• **Database:** SQL fundamentals, basic database design
• **DSA:** Strong foundation in data structures and algorithms
• **Soft Skills:** Communication, teamwork, problem-solving

**Project Ideas That Impress Indian Recruiters:**
• **E-commerce Website:** Shows full-stack development skills
• **Management System:** Library, hospital, school management systems
• **Mobile App:** Android/iOS app solving a real problem
• **Data Analysis Project:** Using Python/R for insights
• **API Integration:** Weather app, payment gateway integration

**Company-Specific Preparation:**

**For Service Companies:**
• Focus on strong fundamentals and willingness to learn
• Prepare for aptitude tests and basic coding questions
• Practice group discussions and HR interviews
• Show stability and long-term commitment

**For Product Companies:**
• Build impressive GitHub profile with quality projects
• Practice DSA problems on LeetCode/GeeksforGeeks
• Understand system design basics
• Contribute to open source projects

**For Startups:**
• Show entrepreneurial mindset and initiative
• Build projects that solve real problems
• Demonstrate ability to learn quickly
• Show passion for the startup's domain

**Interview Preparation:**
• **Technical:** DSA, system design basics, project deep-dives
• **HR:** Why this company, career goals, handling pressure
• **Behavioral:** STAR method for answering situational questions

**Salary Expectations (2024):**
• **Service Companies:** ₹3-6 LPA for freshers
• **Product Companies:** ₹8-25 LPA depending on company tier
• **Startups:** ₹4-12 LPA with potential equity

**Red Flags to Avoid:**
• Job-hopping mentality in interviews
• Unrealistic salary expectations without skills to back
• Poor communication skills
• Lack of genuine interest in technology

Remember: Indian companies value potential and learning ability over perfect skills. Show enthusiasm, respect, and willingness to grow!`;
    }

    // Interview preparation with Indian context
    if (lowerMessage.includes('interview')) {
      return `🎯 **Indian Interview Preparation Guide:**

**Common Interview Rounds in India:**

**1. Aptitude/Online Test:**
• **Quantitative Aptitude:** Basic math, percentages, ratios
• **Logical Reasoning:** Patterns, sequences, puzzles
• **Verbal Ability:** Grammar, comprehension, vocabulary
• **Technical MCQs:** Based on your domain/role

**2. Technical Interview:**
• **DSA Questions:** Arrays, strings, trees, sorting algorithms
• **System Design:** Basic scalability and architecture questions
• **Project Discussion:** Deep dive into your projects
• **Technology Specific:** Framework/language specific questions

**3. HR Interview:**
• **Tell me about yourself:** 2-minute professional summary
• **Why this company:** Show research and genuine interest
• **Career goals:** Align with company's growth opportunities
• **Situational questions:** How you handle pressure, conflicts

**Indian Company Specific Questions:**

**Service Companies:**
• "Are you comfortable working in shifts?" (for global clients)
• "How do you handle changing project requirements?"
• "Describe your experience working in teams"
• "Are you willing to travel for client meetings?"

**Product Companies:**
• "How would you improve our product for Indian users?"
• "Design a system for Indian scale (millions of users)"
• "What's your approach to solving ambiguous problems?"
• "How do you stay updated with technology trends?"

**Startups:**
• "Why startups over established companies?"
• "How do you handle uncertainty and rapid changes?"
• "Describe a time you took initiative"
• "What's your understanding of our business model?"

**Cultural Considerations:**
• **Respect:** Address interviewers formally (Sir/Ma'am initially)
• **Humility:** Balance confidence with humility
• **Family Values:** It's okay to mention family support for career
• **Long-term Commitment:** Show stability and growth mindset

**Technical Preparation by Company Type:**

**For TCS/Infosys/Wipro:**
• Focus on fundamentals over advanced concepts
• Prepare for basic coding questions
• Practice explaining concepts clearly
• Show willingness to learn new technologies

**For Flipkart/Amazon/Microsoft:**
• Master DSA - practice 200+ LeetCode problems
• Understand system design principles
• Prepare for behavioral questions using STAR method
• Know their leadership principles

**For Razorpay/Paytm/Zomato:**
• Understand their business model and challenges
• Prepare for product-thinking questions
• Show passion for solving Indian market problems
• Demonstrate startup mindset and agility

**Common Mistakes to Avoid:**
• Being overconfident or underconfident
• Not researching the company thoroughly
• Giving generic answers without examples
• Poor communication or unclear explanations
• Not asking thoughtful questions about the role

**Sample Questions to Ask:**
• "What does success look like in this role?"
• "What are the biggest challenges facing the team?"
• "How does the company support professional development?"
• "What's the team culture like?"

**Salary Negotiation Tips:**
• Research market rates for your experience level
• Consider the complete package (salary + benefits + growth)
• Be flexible but know your minimum acceptable offer
• Express enthusiasm for the role beyond just compensation

Good luck! Remember, interviews are conversations, not interrogations. Show your genuine interest and let your personality shine through! 🌟`;
    }

    // General motivation and support with Indian context
    if (lowerMessage.includes('motivation') || lowerMessage.includes('tired') || 
        lowerMessage.includes('giving up') || lowerMessage.includes('hard')) {
      const totalApps = applications.length;
      const interviewRate = totalApps > 0 ? applications.filter(app => app.status === 'interview' || app.status === 'offer').length / totalApps * 100 : 0;
      
      return `🌟 **Motivation for Indian Job Market:**

**Your Progress:**
${totalApps > 0 ? `• You've submitted ${totalApps} application${totalApps > 1 ? 's' : ''} - that takes courage and persistence!` : '• Every step you take is progress, even when it doesn\'t feel like it'}
${interviewRate > 0 ? `• Your interview rate is ${Math.round(interviewRate)}% - you're making an impression!` : ''}

**Remember the Indian Success Stories:**
• **Sundar Pichai** (Google CEO) - Started from Chennai, faced rejections early on
• **Satya Nadella** (Microsoft CEO) - Worked his way up from engineer to CEO
• **Ritesh Agarwal** (OYO) - College dropout who built a billion-dollar company
• **Bhavish Aggarwal** (Ola) - Started with a simple idea, now transforming mobility

**Indian Job Market Reality Check:**
• **It's Competitive:** Millions of engineers graduate every year
• **It's Possible:** Thousands get great jobs every month
• **Skills Matter:** Companies are hungry for genuine talent
• **Persistence Pays:** Most successful people faced multiple rejections

**Strategic Approach for India:**
• **Diversify Applications:** Apply to service companies, product companies, and startups
• **Skill Building:** Focus on in-demand skills (DSA, system design, modern frameworks)
• **Network Building:** Use LinkedIn, attend tech meetups, connect with alumni
• **Location Flexibility:** Consider opportunities in Bangalore, Hyderabad, Pune, NCR

**Mindset Shifts:**
• **From "Why me?" to "Why not me?"**
• **From "I'm not good enough" to "I'm learning and improving"**
• **From "This is too hard" to "This is making me stronger"**
• **From "I'll never get a job" to "The right opportunity is coming"**

**Practical Next Steps:**
1. **Skill Assessment:** Identify 2-3 areas to improve this week
2. **Application Strategy:** Apply to 5-10 companies weekly
3. **Network Building:** Connect with 3 new people in your field
4. **Learning Plan:** Dedicate 2 hours daily to skill development

**Indian Market Advantages:**
• **Growing Tech Sector:** India is becoming a global tech hub
• **Startup Boom:** New opportunities emerging every day
• **Remote Work:** Global opportunities now accessible from India
• **Government Support:** Initiatives like Digital India creating more jobs

**When You Feel Down:**
• Remember that rejection is redirection
• Every "no" is practice for the eventual "yes"
• Your background and story are unique strengths
• The Indian tech ecosystem needs diverse talent

**Community Support:**
• Join Indian developer communities on Discord/Telegram
• Participate in local tech meetups and hackathons
• Follow Indian tech leaders on Twitter/LinkedIn
• Contribute to open source projects

You're not just looking for a job - you're building a career in one of the world's most exciting tech markets. The skills you're developing, the resilience you're building, and the network you're creating will serve you for decades.

**Aapka time aayega!** (Your time will come!) 🚀

What specific area would you like to focus on improving this week?`;
    }

    // Application tracking insights with Indian context
    if (lowerMessage.includes('applications') || lowerMessage.includes('stats') || lowerMessage.includes('progress')) {
      const stats = {
        total: applications.length,
        applied: applications.filter(app => app.status === 'applied').length,
        interviews: applications.filter(app => app.status === 'interview').length,
        offers: applications.filter(app => app.status === 'offer').length,
        rejected: applications.filter(app => app.status === 'rejected').length
      };

      if (stats.total === 0) {
        return `🇮🇳 **Getting Started in Indian Job Market:**

**Application Strategy for India:**
• **Target Mix:** 40% service companies, 40% product companies, 20% startups
• **Daily Goal:** Apply to 3-5 companies per day
• **Quality Focus:** Tailor each application to the company
• **Follow-up:** Send polite follow-ups after 1 week

**Where to Apply:**
• **Job Portals:** Naukri.com, LinkedIn, Indeed, Glassdoor
• **Company Websites:** Direct applications often get better response
• **Campus Placements:** If you're a student, don't miss these
• **Referrals:** Leverage your network for warm introductions

**Indian Market Benchmarks:**
• **Response Rate:** 10-20% is normal in Indian market
• **Interview Rate:** 2-5% of applications typically
• **Timeline:** Hiring process can take 2-6 weeks
• **Applications Needed:** 50-200 applications for 1 offer (varies by experience)

**Company Categories to Target:**

**Tier 1 (High Competition, High Rewards):**
• Google, Microsoft, Amazon, Adobe, Uber
• Flipkart, Zomato, Razorpay, Paytm
• Preparation: 6+ months, strong DSA, system design

**Tier 2 (Good Balance):**
• Walmart Labs, PayPal, Salesforce, Oracle
• Swiggy, Ola, Cred, PhonePe
• Preparation: 3-6 months, solid fundamentals

**Tier 3 (Entry-Friendly):**
• TCS, Infosys, Wipro, HCL, Cognizant
• Local startups, mid-size product companies
• Preparation: 1-3 months, basic skills + attitude

**Application Tracking Tips:**
• Track company, role, date applied, status
• Note the job portal used and any referrals
• Set reminders for follow-ups
• Analyze patterns in rejections

Ready to start your application journey? Let me know what type of companies you want to target first!`;
      } else {
        const responseRate = stats.total > 0 ? Math.round(((stats.interviews + stats.offers) / stats.total) * 100) : 0;
        return `📊 **Your Indian Job Search Analytics:**

**Current Stats:**
• **Total Applications:** ${stats.total}
• **Pending Responses:** ${stats.applied}
• **Interviews Secured:** ${stats.interviews}
• **Offers Received:** ${stats.offers}
• **Response Rate:** ${responseRate}%

**Indian Market Benchmarks:**
${responseRate > 15 ? '🎉 **Excellent!** Your response rate is above average for Indian market!' : 
  responseRate > 8 ? '👍 **Good Progress!** You\'re getting decent traction.' :
  '💡 **Room for Improvement** - Let\'s optimize your approach.'}

**Recommendations Based on Your Stats:**

${stats.applied > stats.interviews * 3 ? '**Follow-up Strategy:**\n• Send polite follow-ups after 1 week\n• Connect with hiring managers on LinkedIn\n• Check application status on company portals\n' : ''}

**Application Velocity:**
• **Current Pace:** ${Math.round(stats.total / 4)} applications per week (estimated)
• **Recommended:** 15-20 applications per week for faster results
• **Quality vs Quantity:** Maintain balance between volume and customization

**Market-Specific Insights:**
• **Service Companies:** Usually respond within 1-2 weeks
• **Product Companies:** May take 2-4 weeks for initial response
• **Startups:** Often respond quickly (3-7 days) or not at all

**Optimization Strategies:**

${responseRate < 10 ? '**Low Response Rate Solutions:**\n• Review resume format and keywords\n• Apply through multiple channels (direct + portals)\n• Get referrals from current employees\n• Consider expanding to more company types\n' : ''}

${stats.interviews > 0 ? '**Interview Conversion Focus:**\n• You\'re getting interviews - great sign!\n• Prepare thoroughly for technical rounds\n• Practice behavioral questions\n• Research each company deeply\n' : ''}

**Next Week Action Plan:**
1. **Apply to ${Math.max(10, Math.ceil(stats.total * 0.5))} new positions**
2. **Follow up on ${stats.applied} pending applications**
3. **Prepare for ${stats.interviews} upcoming interviews**
4. **Network with 5 new people in your target companies**

**Indian Market Timing:**
• **Best Application Days:** Tuesday-Thursday
• **Best Time:** 10 AM - 4 PM IST
• **Avoid:** Fridays after 3 PM, festival periods
• **Peak Hiring:** January-March, July-September

${stats.offers > 0 ? '🎉 **Congratulations on your offer(s)!** You\'ve proven the system works. Now focus on negotiation and making the right choice.' : 'Keep going! Your persistence will pay off. The Indian tech market has thousands of opportunities waiting for the right candidate.'}

What specific area would you like to focus on improving this week?`;
      }
    }

    // Default supportive response with Indian context
    return `🇮🇳 **Your AI Career Mentor for Indian Market:**

I'm here to help you navigate the unique landscape of Indian tech careers! I understand the challenges and opportunities specific to our market.

**How I Can Help You:**

🎯 **Company-Specific Guidance:**
• **Service Giants:** TCS, Infosys, Wipro, HCL strategies
• **Product Leaders:** Flipkart, Amazon India, Microsoft positioning
• **Fintech Stars:** Razorpay, Paytm, PhonePe preparation
• **Consumer Tech:** Zomato, Swiggy, Ola optimization
• **Emerging Startups:** Latest unicorns and growth companies

💼 **Resume & Applications:**
• Indian recruiter preferences and expectations
• ATS optimization for Indian job portals
• Academic score presentation strategies
• Technical skills prioritization for Indian market

🗣️ **Interview Preparation:**
• Company-specific interview patterns
• Cultural fit questions for Indian companies
• Technical depth expected at different levels
• Salary negotiation in Indian context

❤️ **Emotional Support:**
• Dealing with competitive pressure
• Managing family expectations
• Building confidence in a tough market
• Celebrating small wins and progress

**Popular Questions I Can Answer:**
• "How do I prepare for TCS/Infosys interviews?"
• "What skills do Flipkart/Amazon look for?"
• "How should a fresher approach the Indian job market?"
• "What's the difference between service and product company expectations?"
• "How do I negotiate salary in Indian companies?"

**Quick Tips for Success:**
• **Consistency:** Apply regularly, don't give up
• **Customization:** Tailor applications to each company
• **Networking:** Leverage LinkedIn and alumni connections
• **Skill Building:** Focus on in-demand technologies
• **Market Awareness:** Understand what each company values

What specific challenge are you facing in your job search journey? Let's tackle it together! 🚀`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 seconds delay
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-green-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">AI Career Mentor 🇮🇳</h1>
            <p className="text-sm text-gray-600">Your guide to the Indian tech job market</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user' 
                  ? 'bg-blue-600' 
                  : 'bg-gradient-to-r from-orange-500 to-green-600'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`flex-1 max-w-3xl ${
                message.role === 'user' ? 'text-right' : ''
              }`}>
                <div className={`inline-block p-4 rounded-xl ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="whitespace-pre-line">{message.content}</div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="bg-gradient-to-r from-orange-50 to-green-50 border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-600 mb-3 flex items-center space-x-1">
              <Sparkles className="w-4 h-4" />
              <span>Quick start options for Indian job market:</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt.prompt)}
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-colors text-left"
                >
                  <div className="text-orange-600">{prompt.icon}</div>
                  <span className="text-sm text-gray-700">{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about Indian companies like TCS, Flipkart, Razorpay, or any career question..."
              className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-lg hover:from-orange-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;