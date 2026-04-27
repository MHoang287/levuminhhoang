import { motion } from 'framer-motion';
import { Code, Database, Globe, Layers, Cpu, Server, Terminal, Smartphone } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      category: "Backend",
      icon: Server,
      skills: ["ASP.NET Core", "Spring Boot", "Node.js"],
      color: "cyan"
    },
    {
      category: "Database",
      icon: Database,
      skills: ["MongoDB", "SQL Server", "MySQL"],
      color: "purple"
    },
    {
      category: "Frontend",
      icon: Terminal,
      skills: ["React", "TypeScript", "Tailwind"],
      color: "blue"
    },
    {
      category: "Công cụ",
      icon: Cpu,
      skills: ["Docker", "Git", "Postman"],
      color: "emerald"
    },
  ];

  return (
    <motion.div
      className="bento-card h-full p-8 flex flex-col justify-between overflow-hidden relative group"
      id="skills"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20 group-hover:border-cyan-400/50 transition-colors">
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">
            Kho tàng công nghệ
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <div key={cat.category} className="space-y-3">
              <div className="flex items-center gap-2 text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                <cat.icon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">{cat.category}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-2 py-1 rounded-md bg-white/5 border border-[var(--card-border)] text-[10px] font-bold text-[var(--text-secondary)] hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 relative z-10">
        <div className="flex items-center gap-4 py-3 px-4 rounded-xl bg-white/5 border border-[var(--card-border)] backdrop-blur-sm overflow-hidden group/marquee">
          <motion.div 
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -100] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-8">
                <span className="text-[10px] font-black text-[var(--text-muted)] opacity-30 uppercase tracking-[0.5em]">Scalability</span>
                <span className="text-[10px] font-black text-cyan-400/30 uppercase tracking-[0.5em]">Performance</span>
                <span className="text-[10px] font-black text-[var(--text-muted)] opacity-30 uppercase tracking-[0.5em]">Security</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/5 blur-[80px] rounded-full group-hover:bg-cyan-500/10 transition-colors duration-700" />
    </motion.div>
  );
}
