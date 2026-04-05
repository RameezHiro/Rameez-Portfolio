import React from 'react';
import { Analytics } from '@vercel/analytics/react';

const TopNavBar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-xl border-b border-[#4d4635]/20 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
    <div className="flex justify-between items-center px-8 py-4 max-w-full mx-auto">
      <div className="font-['Newsreader'] text-2xl font-bold tracking-tight text-[#f0ca6f]">
        Shaikh Rameez
      </div>
      <div className="hidden md:flex space-x-12">
        <a className="font-['Work_Sans'] text-sm uppercase tracking-[0.05em] text-[#f0ca6f] border-b border-[#f0ca6f] pb-1" href="#about">About</a>
        <a className="font-['Work_Sans'] text-sm uppercase tracking-[0.05em] text-[#cfc6ae] hover:text-[#f0ca6f] transition-colors" href="#skills">Skills</a>
        <a className="font-['Work_Sans'] text-sm uppercase tracking-[0.05em] text-[#cfc6ae] hover:text-[#f0ca6f] transition-colors" href="#projects">Projects</a>
        <a className="font-['Work_Sans'] text-sm uppercase tracking-[0.05em] text-[#cfc6ae] hover:text-[#f0ca6f] transition-colors" href="#achievements">Achievements</a>
      </div>
      <div className="flex items-center gap-6">
        <a href="https://github.com/RameezHiro" target="_blank" rel="noreferrer" className="text-[#cfc6ae] hover:bg-[#353534]/30 p-2 rounded-full transition-all duration-300 scale-95 active:scale-90">
          <span className="material-symbols-outlined">code</span>
        </a>
        <a href="#contact" className="bg-primary text-on-primary px-6 py-2 rounded-full font-label font-bold text-xs uppercase tracking-widest hover:bg-primary-container transition-all scale-95 active:scale-90 inline-block">
          Connect
        </a>
      </div>
    </div>
  </nav>
);

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0 grain-texture pointer-events-none"></div>
    {/* Decorative Background Lines */}
    <svg className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100">
      <path className="text-outline-variant" d="M0,20 Q50,10 100,20 M0,50 Q50,40 100,50 M0,80 Q50,70 100,80" fill="transparent" stroke="currentColor" strokeWidth="0.1"></path>
    </svg>
    <div className="relative z-10 text-center max-w-4xl px-6">
      {/* Profile with Halo */}
      <div className="relative w-48 h-48 mx-auto mb-12">
        <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-pulse"></div>
        <div className="absolute -inset-4 rounded-full border border-primary/20"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/20 to-transparent"></div>
        <img className="w-full h-full rounded-full object-cover border-4 border-surface shadow-2xl relative z-10" alt="Shaikh Rameez Profile" src="https://github.com/RameezHiro.png" />
        <div className="absolute bottom-2 -right-4 bg-surface-container-highest border border-outline-variant/30 px-3 py-1 rounded-full flex items-center gap-2 shadow-xl z-20">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] font-label uppercase tracking-wider text-primary">Day 120+ ML Learning</span>
        </div>
      </div>
      <h1 className="font-headline text-6xl md:text-8xl tracking-tighter text-on-surface mb-4">
        Shaikh Rameez
      </h1>
      <p className="font-headline italic text-2xl md:text-3xl text-secondary mb-12">
      First-Year CSE-AIML | Hackathon Winner (115+ teams) | 120+ Days ML Learning 
      </p>
      <p className="max-w-2xl mx-auto text-on-surface-variant font-label mb-12 leading-relaxed">
        First-year B.Tech student passionate about Machine Learning, AI, and data science. Committed to learning through discipline, consistency, and hands-on projects.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="#projects" className="px-8 py-4 bg-primary text-on-primary rounded-full font-label font-bold tracking-[0.1em] text-sm flex items-center gap-3 hover:scale-105 transition-transform">
          VIEW PROJECTS <span className="material-symbols-outlined text-sm">north_east</span>
        </a>
        <a href="#contact" className="px-8 py-4 border border-outline-variant/30 text-secondary rounded-full font-label font-bold tracking-[0.1em] text-sm hover:border-primary/60 transition-colors">
          GET IN TOUCH
        </a>
      </div>
    </div>
  </section>
);

const AboutStatsSection = () => (
  <section id="about" className="py-24 bg-surface-container-low relative">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid md:grid-cols-3 gap-0 border border-outline-variant/20 rounded-2xl overflow-hidden">
        <div className="p-12 text-center border-r border-outline-variant/20 bg-surface-container/30 hover:bg-surface-container/50 transition-colors">
          <div className="font-headline text-5xl text-primary mb-2">120+</div>
          <div className="font-label uppercase tracking-[0.2em] text-[10px] text-secondary/60">Day Learning Streak</div>
        </div>
        <div className="p-12 text-center border-r border-outline-variant/20 bg-surface-container/30 hover:bg-surface-container/50 transition-colors">
          <div className="font-headline text-5xl text-primary mb-2">17</div>
          <div className="font-label uppercase tracking-[0.2em] text-[10px] text-secondary/60">Public Repositories</div>
        </div>
        <div className="p-12 text-center bg-surface-container/30 hover:bg-surface-container/50 transition-colors">
          <div className="font-headline text-5xl text-primary mb-2">185</div>
          <div className="font-label uppercase tracking-[0.2em] text-[10px] text-secondary/60">GitHub Contributions</div>
        </div>
      </div>
      <div className="mt-20 max-w-3xl mx-auto text-center">
       <h2 className="font-headline text-4xl mb-8">About Me</h2>
        <p className="text-secondary/80 leading-relaxed text-lg mb-6">
          I'm a first-year B.Tech CSE-AIML student at Mumbai, driven by an insatiable curiosity about Artificial Intelligence and Machine Learning. What started as an interest has evolved into a 120+ day learning streak, where I dedicate myself daily to understanding the fundamentals and building practical projects.
        </p>
        <p className="text-primary italic text-xl font-headline border-l-4 border-primary/40 pl-6 text-left max-w-2xl mx-auto mb-6">
          "I believe in learning through Discipline, Consistency, Hands-on projects, and Fundamentals"
        </p>
        <p className="text-secondary/80 leading-relaxed text-lg">
          Unlike many who jump straight into frameworks, I've invested significant time mastering the mathematical foundations—Linear Algebra, Calculus, Probability, and Statistics. This solid groundwork enables me to truly understand how ML algorithms work, not just use them.
        </p>
      </div>
    </div>
  </section>
);

const TechnicalStackSection = () => (
  <section id="skills" className="py-32 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <span className="font-label text-primary uppercase tracking-[0.3em] text-xs">Technical Skills</span>
          <h2 className="font-headline text-5xl mt-4">Tools & Technologies</h2>
        </div>
        <p className="text-secondary/60 max-w-sm text-right font-label text-xs uppercase tracking-widest leading-loose">
          A curated selection of languages, libraries, and foundations employed in my work.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {[
          { icon: 'code', label: 'Python (Advanced)' },
          { icon: 'schema', label: 'Git & GitHub' },
          { icon: 'api', label: 'FastAPI (Learning)' },
          { icon: 'database', label: 'MySQL (Learning)' },
          { icon: 'calculate', label: 'Math Foundations' },
          { icon: 'data_object', label: 'NumPy & Pandas' },
          { icon: 'bar_chart', label: 'Matplotlib & Seaborn' },
          { icon: 'psychology', label: 'Scikit-learn' },
          { icon: 'web', label: 'Streamlit' }
        ].map((item, index) => (
          <div key={index} className="group p-8 rounded-2xl bg-surface-container-high border border-outline-variant/10 flex flex-col items-center justify-center gap-4 hover:border-primary/40 transition-all">
            <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest rounded-xl text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">{item.icon}</span>
            </div>
            <span className="font-label text-xs uppercase tracking-widest text-secondary text-center">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProjectsSection = () => (
  <section id="projects" className="py-32 bg-surface">
    <div className="max-w-7xl mx-auto px-8">
      <div className="text-center mb-16">
        <h2 className="font-headline text-5xl mb-4">Featured Projects</h2>
        <p className="text-secondary/60 font-label tracking-widest uppercase">Building practical solutions with Machine Learning</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Project 1 */}
        <div className="group relative bg-surface-container-high rounded-2xl overflow-hidden border border-outline-variant/20 transition-all hover:-translate-y-2">
          <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline text-2xl">California Housing Price Predictor</h3>
              <span className="px-3 py-1 bg-primary/10 rounded-full text-[10px] font-label uppercase text-primary border border-primary/20">Ready</span>
            </div>
            <p className="text-secondary/70 text-sm mb-8 leading-relaxed flex-grow">
              ML model predicting median house prices in California districts using census data. Features comprehensive data preprocessing, visualization, and regression modeling.
            </p>
            <div className="flex flex-wrap gap-2 mb-8 mt-auto">
              {['Python', 'NumPy', 'Pandas', 'Scikit-learn'].map((tag) => (
                <span key={tag} className="px-2 py-1 bg-surface-container-highest text-[10px] font-label tracking-widest uppercase text-secondary/60 border border-outline-variant/20 rounded">{tag}</span>
              ))}
            </div>
            <a className="flex items-center gap-2 text-primary font-label text-xs tracking-widest uppercase group/link" href="https://github.com/RameezHiro/California-Housing-Prices" target="_blank" rel="noreferrer">
              Inspect Code <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">code</span>
            </a>
          </div>
        </div>
        
        {/* Project 2 */}
        <div className="group relative bg-surface-container-high rounded-2xl overflow-hidden border border-outline-variant/20 transition-all hover:-translate-y-2 lg:translate-y-6">
          <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline text-2xl">Jarvis - Voice Assistant</h3>
              <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-label uppercase text-secondary border border-outline-variant/20">Completed</span>
            </div>
            <p className="text-secondary/70 text-sm mb-8 leading-relaxed flex-grow">
              Python-based AI assistant with voice recognition and speech synthesis. Opens websites, plays music, and fetches BBC news headlines on command.
            </p>
            <div className="flex flex-wrap gap-2 mb-8 mt-auto">
              {['Python', 'Speech Recognition', 'TTS'].map((tag) => (
                <span key={tag} className="px-2 py-1 bg-surface-container-highest text-[10px] font-label tracking-widest uppercase text-secondary/60 border border-outline-variant/20 rounded">{tag}</span>
              ))}
            </div>
            <a className="flex items-center gap-2 text-primary font-label text-xs tracking-widest uppercase group/link" href="https://github.com/RameezHiro" target="_blank" rel="noreferrer">
              Inspect Code <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">code</span>
            </a>
          </div>
        </div>
        
        {/* Project 3 */}
        <div className="group relative bg-surface-container-high rounded-2xl overflow-hidden border border-outline-variant/20 transition-all hover:-translate-y-2">
          <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline text-2xl">Machine Learning Portfolio</h3>
              <span className="px-3 py-1 bg-primary/20 rounded-full text-[10px] font-label uppercase text-primary border border-primary/40">Ongoing / Day 120+</span>
            </div>
            <p className="text-secondary/70 text-sm mb-8 leading-relaxed flex-grow">
              Comprehensive documentation of my ML learning journey. Contains notebooks, experiments, and implementations of various ML algorithms.
            </p>
            <div className="flex flex-wrap gap-2 mb-8 mt-auto">
              {['Jupyter', 'Python', 'ML Libraries'].map((tag) => (
                <span key={tag} className="px-2 py-1 bg-surface-container-highest text-[10px] font-label tracking-widest uppercase text-secondary/60 border border-outline-variant/20 rounded">{tag}</span>
              ))}
            </div>
            <a className="flex items-center gap-2 text-primary font-label text-xs tracking-widest uppercase group/link" href="https://github.com/RameezHiro/Machine-Learning-Portfolio" target="_blank" rel="noreferrer">
              View Journey <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">article</span>
            </a>
          </div>
        </div>
        
        {/* Project 4 */}
        <div className="group relative bg-surface-container-high rounded-2xl overflow-hidden border border-outline-variant/20 transition-all hover:-translate-y-2">
          <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline text-2xl">Streamlit Learning Projects</h3>
              <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-label uppercase text-secondary border border-outline-variant/20">In Progress</span>
            </div>
            <p className="text-secondary/70 text-sm mb-8 leading-relaxed flex-grow">
              Collection of interactive data visualization projects built with Streamlit. Exploring web app development for data science applications.
            </p>
            <div className="flex flex-wrap gap-2 mb-8 mt-auto">
              {['Python', 'Streamlit', 'Pandas', 'Matplotlib'].map((tag) => (
                <span key={tag} className="px-2 py-1 bg-surface-container-highest text-[10px] font-label tracking-widest uppercase text-secondary/60 border border-outline-variant/20 rounded">{tag}</span>
              ))}
            </div>
            <a className="flex items-center gap-2 text-primary font-label text-xs tracking-widest uppercase group/link" href="https://github.com/RameezHiro/Learn-Streamlit" target="_blank" rel="noreferrer">
              Inspect Code <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">code</span>
            </a>
          </div>
        </div>
        
        {/* Project 5 Template */}
        <div className="group relative bg-surface-container-high rounded-2xl overflow-hidden border border-outline-variant/20 transition-all hover:-translate-y-2 lg:translate-y-6">
          <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline text-2xl">AI Powered Academic Career Navigator</h3>
              <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-label uppercase text-secondary border border-outline-variant/20">Completed</span>
            </div>
            <p className="text-secondary/70 text-sm mb-8 leading-relaxed flex-grow">
              Won Judge's Choice Award at UAI Hawkathon among 115+ teams in 24 hours. 
              Built K-Means clustering model to identify at-risk students using 
              attendance and performance data. Trained on 2,000+ student records, 
              achieving 84% early intervention accuracy.

              My role: Developed ML model and integrated with Django REST API for 
              real-time predictions. Built Streamlit dashboard for insights.

              Team: 4 members | Built in: 24 hours
            </p>
            <div className="flex flex-wrap gap-2 mb-8 mt-auto">
              {['Python', 'K-Means Clustering', 'Streamlit', 'Pandas', 'Matplotlib'].map((tag) => (
                <span key={tag} className="px-2 py-1 bg-surface-container-highest text-[10px] font-label tracking-widest uppercase text-secondary/60 border border-outline-variant/20 rounded">{tag}</span>
              ))}
            </div>
            <a className="flex items-center gap-2 text-primary font-label text-xs tracking-widest uppercase group/link" href="https://github.com/RameezHiro/AI-Powered-Academic-Career-Navigator.git" target="_blank" rel="noreferrer">
              Inspect Code <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">code</span>
            </a>
          </div>
        </div>
        
        {/* Project 6 Template */}
        <div className="group relative bg-surface-container-high rounded-2xl overflow-hidden border border-outline-variant/20 transition-all hover:-translate-y-2">
          <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline text-2xl">LifeVault</h3>
              <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-label uppercase text-secondary border border-outline-variant/20">Completed</span>
            </div>
            <p className="text-secondary/70 text-sm mb-8 leading-relaxed flex-grow">
              Digital legacy platform with dead man's switch and ML-powered farewell 
              message analysis. Built 3 ML endpoints: sentiment classifier, readiness 
              scoring, and TF-IDF + Naive Bayes categorization for Aakhri Khat 
              (farewell letters).

              Full-stack: FastAPI backend, React frontend, SQLite database. Adapted 
              from Laravel+React architecture to single FastAPI app.

              Hackathon MVP | Complete setup documentation
            </p>
            <div className="flex flex-wrap gap-2 mb-8 mt-auto">
            {['Python', 'Scikit-learn', 'Pandas', 'NumPy'].map((tag) => (
                <span key={tag} className="px-2 py-1 bg-surface-container-highest text-[10px] font-label tracking-widest uppercase text-secondary/60 border border-outline-variant/20 rounded">{tag}</span>
              ))}
            </div>
            <a className="flex items-center gap-2 text-primary font-label text-xs tracking-widest uppercase group/link" href="https://github.com/RameezHiro/LIFEVAULT.git" target="_blank" rel="noreferrer">
              Inspect Code <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">code</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SystemMilestones = () => (
  <section id="achievements" className="py-32 bg-surface-container-low border-y border-outline-variant/10">
    <div className="max-w-7xl mx-auto px-8">
      <h2 className="font-headline text-4xl mb-12 flex items-center gap-4">
        Achievements & Highlights <span className="h-px bg-outline-variant/40 flex-grow"></span>
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4 border-l border-primary/40 pl-6 py-4">
          <span className="font-label text-primary text-[10px] uppercase tracking-widest">Hackathon Winner</span>
          <h4 className="font-headline text-xl">Judge's Choice Award</h4>
          <p className="text-secondary/60 text-xs leading-relaxed uppercase tracking-wider">
            UAI Hawkathon 2026 | Won among 115+ teams
            ₹2,500 prize | 24-hour ML competition</p>
        </div>
        <div className="flex flex-col gap-4 border-l border-outline-variant/40 pl-6 py-4">
          <span className="font-label text-secondary text-[10px] uppercase tracking-widest">Continuous Learning</span>
          <h4 className="font-headline text-xl">120+ Days Streak</h4>
          <p className="text-secondary/60 text-xs leading-relaxed uppercase tracking-wider">Consistent Machine Learning Practice</p>
        </div>
        <div className="flex flex-col gap-4 border-l border-outline-variant/40 pl-6 py-4">
          <span className="font-label text-secondary text-[10px] uppercase tracking-widest">2025 Winner</span>
          <h4 className="font-headline text-xl">Hacktoberfest</h4>
              <p className="text-secondary/60 text-xs leading-relaxed uppercase tracking-wider">Open Source Contributor
              Hacktoberfest 2025 - 9+ merged pull requests
              Contributing to Python Mini Projects</p>     
        </div>
        <div className="flex flex-col gap-4 border-l border-outline-variant/40 pl-6 py-4">
          <span className="font-label text-secondary text-[10px] uppercase tracking-widest">Community</span>
          <h4 className="font-headline text-xl">325+ Followers</h4>
          <p className="text-secondary/60 text-xs leading-relaxed uppercase tracking-wider">Building in public on Twitter & GitHub</p>
        </div>
      </div>
    </div>
  </section>
);

const ConnectSection = () => (
  <section id="contact" className="py-32 relative overflow-hidden">
    <div className="absolute inset-0 grain-texture pointer-events-none"></div>
    <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
      <h2 className="font-headline text-6xl md:text-8xl mb-6 text-on-surface">Let's Connect</h2>
      <p className="text-secondary/60 mb-12 font-label uppercase tracking-widest">Open for hackathons and collaborations</p>
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <a className="group bg-surface-container-high p-8 rounded-3xl border border-outline-variant/20 hover:border-primary/60 transition-all text-left" href="mailto:yellowvoid22@gmail.com">
          <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">alternate_email</span>
          </div>
          <span className="font-label text-[10px] text-secondary/60 uppercase tracking-[0.2em] block mb-2">Electronic Mail</span>
          <span className="font-headline text-2xl text-on-surface">yellowvoid22@gmail.com</span>
        </a>
        <div className="group bg-surface-container-high p-8 rounded-3xl border border-outline-variant/20 text-left">
          <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl mb-6">
            <span className="material-symbols-outlined">location_on</span>
          </div>
          <span className="font-label text-[10px] text-secondary/60 uppercase tracking-[0.2em] block mb-2">Origin Point</span>
          <span className="font-headline text-2xl text-on-surface">Mumbai, India</span>
        </div>
      </div>
      <div className="mt-16 flex justify-center gap-12 font-label text-xs uppercase tracking-[0.3em] flex-wrap">
        <a className="text-secondary hover:text-primary transition-colors flex items-center gap-2" href="https://www.linkedin.com/in/shaikh-rameez-17b304336/" target="_blank" rel="noreferrer"><span className="material-symbols-outlined text-[1rem]">link</span> LinkedIn</a>
        <a className="text-secondary hover:text-primary transition-colors flex items-center gap-2" href="https://github.com/RameezHiro" target="_blank" rel="noreferrer"><span className="material-symbols-outlined text-[1rem]">code</span> GitHub</a>
        <a className="text-secondary hover:text-primary transition-colors flex items-center gap-2" href="https://x.com/yellow_void22" target="_blank" rel="noreferrer"><span className="material-symbols-outlined text-[1rem]">tag</span> X / Twitter</a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#131313] w-full border-t border-[#4d4635]/10 mt-20">
    <div className="flex flex-col md:flex-row justify-between items-center px-12 py-8 w-full gap-6">
      <div className="font-['Newsreader'] italic text-[#cfc6ae]">
        Shaikh Rameez
      </div>
      <div className="font-['Work_Sans'] uppercase tracking-[0.05em] text-[10px] text-[#cfc6ae]/60 text-center">
        © 2025 Shaikh Rameez. Designed & Developed by @RameezHiro
      </div>
      <div className="flex gap-8">
        <a className="font-['Work_Sans'] uppercase tracking-[0.05em] text-[10px] text-[#cfc6ae]/60 hover:text-[#fdc390] transition-colors opacity-80 hover:opacity-100" href="#home">Back to Top</a>
        <a className="font-['Work_Sans'] uppercase tracking-[0.05em] text-[10px] text-[#cfc6ae]/60 hover:text-[#fdc390] transition-colors opacity-80 hover:opacity-100" href="https://github.com/RameezHiro" target="_blank" rel="noreferrer">GitHub Profile</a>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="scroll-smooth">
      <TopNavBar />
      <HeroSection />
      <AboutStatsSection />
      <TechnicalStackSection />
      <ProjectsSection />
      <SystemMilestones />
      <ConnectSection />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
