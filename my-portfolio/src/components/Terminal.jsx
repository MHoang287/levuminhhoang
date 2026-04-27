import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'LVMH System v1.0.0' },
    { type: 'system', content: 'Gõ "help" để xem các lệnh có sẵn.' },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => 'Các lệnh khả dụng: about, skills, contact, clear, date, whoami',
    about: () => 'Lê Vũ Minh Hoàng - Backend Developer. Đam mê xây dựng hệ thống server-side.',
    skills: () => 'Backend: ASP.NET Core, Spring Boot, Node.js. DB: MongoDB, SQL Server, MySQL.',
    contact: () => 'Email: levuminhhoang.work@gmail.com | GitHub: MHoang287',
    date: () => new Date().toLocaleString('vi-VN'),
    whoami: () => 'Bạn là một khách quý đang ghé thăm portfolio của tôi!',
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
          newHistory.push({ type: 'response', content: `Lệnh không hợp lệ: ${cmd}. Gõ "help" để xem danh sách lệnh.` });
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
