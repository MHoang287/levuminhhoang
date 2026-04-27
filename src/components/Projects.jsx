import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: "E-learning Platform",
      tagline: "Hệ thống học trực tuyến quy mô nhỏ",
      tech: ["ASP.NET Core", "SQL Server", "Momo API"],
      description: "Tập trung giải pháp thanh toán và phân quyền người dùng phức tạp.",
      bg: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Cinema Booking AI",
      tagline: "Đặt vé xem phim thông minh",
      tech: ["Java Spring Boot", "Gemini AI", "Google Maps"],
      description: "Tích hợp AI Chatbot và định vị tối ưu hóa luồng mua vé.",
      bg: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 h-full">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className="bento-card group relative overflow-hidden flex flex-col min-h-[350px] md:min-h-[400px]"
        >
          <div className="absolute inset-0 z-0">
            <motion.img 
              src={project.bg} 
              className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-[var(--bg-color)]/80 to-transparent" />
          </div>

          <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full ${index === 1 ? 'bg-cyan-400/10 border-cyan-400/20 text-cyan-400' : 'bg-blue-400/10 border-blue-400/20 text-blue-400'} border text-[9px] font-black uppercase tracking-widest`}>
                {index === 1 ? 'Dự án tiêu biểu' : 'Ứng dụng Web'}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-black text-[var(--text-primary)] mb-2 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-sm text-[var(--text-secondary)] mb-6 font-medium leading-relaxed max-w-sm">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 border border-[var(--card-border)] text-[10px] font-bold text-[var(--text-muted)]">
                  {t}
                </span>
              ))}
            </div>

            <motion.button
              className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)] group/btn"
              whileHover={{ x: 5 }}
            >
              Xem chi tiết
              <ArrowRight className={`w-4 h-4 ${index === 1 ? 'text-cyan-400' : 'text-blue-400'} group-hover/btn:translate-x-1 transition-transform`} />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
