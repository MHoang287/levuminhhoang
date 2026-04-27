import { motion } from 'framer-motion';
import { MapPin, Calendar, FileText } from 'lucide-react';
import CVViewer from './CVViewer';
import avatar from '../assets/avt.jpg';

export default function AboutMe() {
  return (
    <motion.div
      className="bento-card h-full p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 group overflow-hidden"
    >
      {/* Lớp phủ trang trí */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      />

      {/* Ảnh đại diện với hiệu ứng nâng cao */}
      <motion.div
        className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-[2.5rem] overflow-hidden border-2 border-[var(--card-border)] group-hover:border-cyan-400/50 transition-all duration-700 shrink-0 shadow-2xl z-20"
        whileHover={{ scale: 1.03 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-10"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
        <motion.img
          alt="Lê Vũ Minh Hoàng"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          src={avatar}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&q=80&w=800";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0" />
      </motion.div>

      {/* Nội dung chữ */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left relative z-20 flex-grow">
        {/* Badge trạng thái */}
        <motion.div
          className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-cyan-500/20 backdrop-blur-md"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,255,0.3)" }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-cyan-400"
            animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="flex items-center">
            Sẵn sàng
            <div className="flex ml-0.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  .
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tên - Tự động điều chỉnh kích thước mượt mà */}
        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] mb-3 tracking-tighter leading-none transition-colors">
          Lê Vũ <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Minh Hoàng</span>
        </h1>

        {/* Thông tin phụ - Tăng kích thước để dễ đọc hơn */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            TP. Hồ Chí Minh
          </div>
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 transition-colors">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            Sinh viên năm 4
          </div>
        </div>

        {/* Giới thiệu - Tăng trọng số chữ và chiều cao dòng */}
        <p className="text-[var(--text-secondary)] text-[15px] sm:text-base leading-relaxed mb-8 max-w-xl font-medium transition-colors">
          Một <span className="text-[var(--text-primary)] font-bold border-b border-cyan-400/30">Backend Developer</span> đam mê xây dựng các hệ thống phía server hiệu năng cao. 
          Kỹ năng chuyên sâu về thiết kế API và tối ưu hóa cấu trúc dữ liệu phức tạp.
        </p>

        {/* Nút hành động */}
        <div className="w-full sm:w-auto">
          <CVViewer />
        </div>
      </div>
    </motion.div>
  );
}
