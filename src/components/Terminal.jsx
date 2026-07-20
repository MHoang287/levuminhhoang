import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function Terminal({ t }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: t.sysTitle },
    { type: 'system', content: t.sysHelp },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Reset terminal welcome when language changes
    setHistory([
      { type: 'system', content: t.sysTitle },
      { type: 'system', content: t.sysHelp },
    ]);
  }, [t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => t.sysPromptHelp,
    about: () => t.sysPromptAbout,
    skills: () => t.sysPromptSkills,
    contact: () => t.sysPromptContact,
    date: () => new Date().toLocaleString(),
    whoami: () => t.sysPromptWhoami,
    clear: () => {
      setHistory([]);
      return null;
    },
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'user', content: input }];

      if (cmd) {
        if (commands[cmd]) {
          const response = commands[cmd]();
          if (response) {
            newHistory.push({ type: 'response', content: response });
          }
        } else {
          newHistory.push({ type: 'response', content: `${t.sysInvalid}: ${cmd}.` });
        }
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="bento-card h-full flex flex-col font-mono text-[13px] overflow-hidden transition-colors duration-500">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-[var(--card-border)]">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-500" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)]">lvmh — bash</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={scrollRef}
        className="flex-grow p-4 overflow-y-auto scrollbar-hide space-y-1.5 custom-scrollbar bg-white/5 backdrop-blur-md"
      >
        {history.map((line, i) => (
          <div key={i} className={`leading-relaxed ${
            line.type === 'user' ? 'text-[var(--text-primary)] font-bold' : 
            line.type === 'system' ? 'text-cyan-500 opacity-80' : 
            'text-[var(--text-secondary)]'
          }`}>
            {line.type === 'user' && <span className="text-cyan-500 mr-2">$</span>}
            {line.content}
          </div>
        ))}
        
        {/* Input Line */}
        <div className="flex items-center text-[var(--text-primary)]">
          <span className="text-cyan-500 mr-2 font-bold">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none outline-none flex-grow text-[var(--text-primary)]"
            autoFocus
          />
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-4 bg-cyan-500 ml-1"
          />
        </div>
      </div>
    </div>
  );
}
