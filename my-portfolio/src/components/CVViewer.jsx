import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, X, ExternalLink } from 'lucide-react';

export default function CVViewer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Nút Khám phá CV */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="group relative overflow-hidden bg-cyan-500/10 backdrop-blur-md text-cyan-400 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] border border-cyan-400/30 hover:shadow-[0_0_40px_rgba(0,255,255,0.3)] w-full md:w-auto"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600"
          initial={{ y: '102%' }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <motion.span
          className="relative z-10 italic flex items-center justify-center gap-2"
          whileHover={{ gap: "12px" }}
          transition={{ duration: 0.3 }}
        >
          <FileText className="w-4 h-4" />
          Khám phá CV
        </motion.span>
      </motion.button>

      {/* Modal CV toàn màn hình */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[99] bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed inset-0 z-[100] flex flex-col transition-colors duration-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ backgroundColor: 'var(--bg-color)' }}
            >
              {/* Thanh tiêu đề */}
              <header
                className="relative z-10 w-full h-20 md:h-24 px-6 md:px-12 flex justify-between items-center shadow-2xl transition-colors duration-500"
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  borderBottom: '1px solid var(--card-border)',
                  backdropFilter: 'blur(24px)'
                }}
              >
                <div className="flex items-center gap-6">
                  <div className="hidden md:flex w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                    <FileText className="w-6 h-6 text-black" />
                  </div>

                  <div className="flex flex-col">
                    <h2 className="text-xl md:text-2xl font-black tracking-tighter leading-none transition-colors" style={{ color: 'var(--text-primary)' }}>
                      CURRICULUM VITAE
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-colors" style={{ color: 'var(--accent-color)' }}>
                        Lê Vũ Minh Hoàng • Backend Developer
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href="cv/LeVuMinhHoang_CV.pdf"
                    download
                    className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 border text-[10px] font-black uppercase tracking-widest group"
                    style={{ 
                      backgroundColor: 'var(--card-bg)', 
                      borderColor: 'var(--card-border)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <Download className="w-4 h-4 group-hover:animate-bounce" />
                    <span className="hidden sm:inline">Tải PDF</span>
                  </a>

                  <a
                    href="cv/LeVuMinhHoang_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300"
                    style={{ 
                      backgroundColor: 'var(--card-bg)', 
                      borderColor: 'var(--card-border)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all duration-500 border border-red-500/20 shadow-xl"
                  >
                    <X className="w-6 h-6 md:w-8 h-8 font-bold" />
                  </button>
                </div>
              </header>

              {/* Nội dung CV */}
              <main className="flex-1 relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: 'var(--bg-color)' }}>
                <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-cyan-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full" />

                <div className="relative w-full h-full flex justify-center p-0 md:p-4 lg:p-8">
                  <div
                    className="w-full h-full max-w-7xl shadow-2xl rounded-none md:rounded-2xl overflow-hidden border transition-colors duration-500"
                    style={{ 
                      backgroundColor: 'white', 
                      borderColor: 'var(--card-border)' 
                    }}
                  >
                    <iframe
                      src="cv/LeVuMinhHoang_CV.pdf#view=FitH&toolbar=0"
                      className="w-full h-full border-none shadow-inner"
                      title="CV Document Full Screen"
                    />
                  </div>
                </div>
              </main>

              <div 
                className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 backdrop-blur-md rounded-full border transition-colors duration-500"
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  borderColor: 'var(--card-border)' 
                }}
              >
                <p className="text-[9px] uppercase font-black tracking-widest italic" style={{ color: 'var(--text-muted)' }}>
                  Vuốt để xem chi tiết
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
