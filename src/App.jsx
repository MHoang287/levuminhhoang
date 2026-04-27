import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Code, Layers, Grid, Music, MapPin, Calendar, Sun, Moon } from 'lucide-react';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Projects from './components/Projects';
import CustomCursor from './components/CustomCursor';
import GridGlow from './components/GridGlow';
import SmoothScroll from './components/SmoothScroll';
import FloatingContact from './components/FloatingContact';
import Terminal from './components/Terminal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'projects', 'skills'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'projects', label: 'Dự án', icon: Code },
    { id: 'skills', label: 'Kỹ năng', icon: Layers },
  ];

  return (
    <SmoothScroll>
      <div className="text-[var(--text-primary)] min-h-screen flex flex-col font-body-md bg-[var(--bg-color)] selection:bg-cyan-500/30 overflow-x-hidden relative transition-colors duration-500">
        <CustomCursor />
        <GridGlow />
        <div className="noise-overlay" />
        
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/4 w-[70%] h-[70%] bg-cyan-500/5 blur-[120px] rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: theme === 'dark' ? [0.3, 0.5, 0.3] : [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-1/2 -right-1/4 w-[70%] h-[70%] bg-purple-600/5 blur-[120px] rounded-full"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: theme === 'dark' ? [0.3, 0.5, 0.3] : [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* TopAppBar */}
        <motion.header
          className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
            isScrolled
              ? 'bg-[var(--bg-color)]/80 backdrop-blur-2xl border-b border-[var(--card-border)] shadow-[0_10px_40px_rgba(0,0,0,0.1)]'
              : 'bg-transparent'
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex justify-between items-center h-20 px-6 md:px-12 w-full max-w-screen-2xl mx-auto font-inter tracking-tight">
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-xl md:text-2xl font-black tracking-tighter leading-none bg-gradient-to-r from-[var(--text-primary)] via-cyan-400 to-[var(--text-primary)] bg-clip-text text-transparent transition-colors">
                Lê Vũ Minh Hoàng
              </span>
              <motion.span
                className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-bold mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Backend Developer
              </motion.span>
            </motion.div>

            <nav className="hidden md:flex gap-4 items-center">
              <div className="flex gap-1 p-1 bg-[var(--card-bg)] backdrop-blur-md rounded-2xl border border-[var(--card-border)] transition-colors duration-500">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.id === 'home' ? '#' : `#${item.id}`}
                    className={`relative px-6 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeSection === item.id
                        ? 'text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] opacity-40 hover:opacity-100 hover:bg-[var(--text-primary)]/5'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute inset-0 bg-cyan-500/20 rounded-xl border border-cyan-400/30"
                        layoutId="activeNav"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <item.icon className={`w-4 h-4 relative z-10 ${activeSection === item.id ? 'text-cyan-400' : ''}`} />
                    <span className="relative z-10">{item.label}</span>
                  </motion.a>
                ))}
              </div>

              <motion.button
                onClick={toggleTheme}
                className="w-12 h-12 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-cyan-400 hover:bg-cyan-400/10 transition-all shadow-lg"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </nav>

            {/* Mobile Header Controls */}
            <div className="md:hidden flex items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-cyan-400"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>
              <div className="w-10 h-10 rounded-full bg-[var(--card-bg)] flex items-center justify-center border border-[var(--card-border)] text-[var(--text-primary)]">
                <Grid className="w-5 h-5" />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Grid Content */}
        <main className="flex-grow pt-32 pb-24 px-4 md:px-8 lg:px-12 max-w-screen-2xl mx-auto w-full relative z-10" id="home">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Block 1: Intro (Full width on Mobile, 2x2 on Desktop) */}
            <motion.div
              variants={itemVariants}
              className="col-span-1 md:col-span-2 lg:row-span-2"
            >
              <AboutMe />
            </motion.div>

            {/* Block 2: Skills (Full width on Mobile, 2x1 on Desktop) */}
            <motion.div
              variants={itemVariants}
              className="col-span-1 md:col-span-2 lg:row-span-1"
            >
              <Skills theme={theme} />
            </motion.div>

            {/* Block 3: Experience (1x1) */}
            <motion.div
              variants={itemVariants}
              className="col-span-1 lg:col-span-1 bento-card p-6 md:p-8 flex flex-col justify-between group cursor-pointer min-h-[180px]"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20 group-hover:border-cyan-400/50 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                <Calendar className="w-6 h-6 md:w-7 md:h-7 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.2em] mb-1 md:mb-2">Kinh nghiệm</p>
                <h3 className="text-lg md:text-xl font-bold leading-tight group-hover:text-cyan-400 transition-colors">Thực tập sinh Backend</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium italic transition-colors">2026 - Hiện tại</p>
              </div>
            </motion.div>

            {/* Block 4: Spotify (1x1) */}
            <motion.div
              variants={itemVariants}
              className="col-span-1 lg:col-span-1 bento-card group overflow-hidden min-h-[180px]"
            >
              <div className="absolute inset-0 z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500 p-6 md:p-8 flex flex-col justify-between bg-[var(--card-bg)] backdrop-blur-xl">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#1DB954]/10 flex items-center justify-center border border-[#1DB954]/20">
                    <Music className="w-5 h-5 md:w-6 md:h-6 text-[#1DB954]" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1DB954]/10 rounded-full border border-[#1DB954]/20">
                    <span className="flex gap-0.5">
                      <span className="w-0.5 h-2 bg-[#1DB954] animate-[music-bar_0.8s_ease-in-out_infinite]"></span>
                      <span className="w-0.5 h-3 bg-[#1DB954] animate-[music-bar_1.2s_ease-in-out_infinite]"></span>
                      <span className="w-0.5 h-2 bg-[#1DB954] animate-[music-bar_1s_ease-in-out_infinite]"></span>
                    </span>
                    <span className="text-[8px] font-black text-[#1DB954] uppercase tracking-widest">Đang nghe</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase font-black tracking-widest mb-1 transition-colors">Spotify</p>
                  <h3 className="text-lg md:text-xl font-black leading-tight text-[var(--text-primary)] transition-colors truncate">Không Buông</h3>
                  <p className="text-xs text-[var(--text-secondary)] font-medium transition-colors">Hngle</p>
                </div>
              </div>
              <iframe 
                src="https://open.spotify.com/embed/track/1ApIGNgp1azc0qB61x4GzG?utm_source=generator&theme=0" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
              ></iframe>
            </motion.div>

            {/* Block 5: Terminal (Full width) */}
            <motion.div
              variants={itemVariants}
              className="col-span-1 md:col-span-2 lg:col-span-4 h-[250px] md:h-[300px]"
            >
              <Terminal />
            </motion.div>

            {/* Block 6: Projects (Full width) */}
            <motion.div
              variants={itemVariants}
              className="col-span-1 md:col-span-2 lg:col-span-4"
              id="projects"
            >
              <Projects />
            </motion.div>
          </motion.div>
        </main>

        <FloatingContact />

        {/* Footer */}
        <motion.footer
          className="w-full py-12 md:py-16 border-t border-white/5 bg-[var(--bg-color)] relative z-10 transition-colors duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-8 md:px-12 max-w-screen-2xl mx-auto text-[var(--text-primary)] transition-colors text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xl font-black tracking-tighter">LVMH</span>
              <p className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-widest font-bold transition-colors">Backend Developer Portfolio</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {navItems.map((item) => (
                <a key={item.id} href={item.id === 'home' ? '#' : `#${item.id}`} className="text-sm font-medium text-[var(--text-secondary)] hover:text-cyan-400 transition-colors">
                  {item.label}
                </a>
              ))}
            </div>

            <p className="text-sm font-medium text-[var(--text-muted)] transition-colors">
              © 2026 Lê Vũ Minh Hoàng
            </p>
          </div>
        </motion.footer>
      </div>
    </SmoothScroll>
  );
}

export default App;
