import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MessageCircle, Mail, X, Share2, Code, Users } from 'lucide-react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    { href: "https://github.com/MHoang287", label: "GitHub", icon: Code, color: "bg-[#24292e]" },
    { href: "https://linkedin.com/in/levuminhhoang", label: "LinkedIn", icon: Users, color: "bg-[#0077b5]" },
    { href: "mailto:levuminhhoang.work@gmail.com", label: "Email", icon: Mail, color: "bg-[#ea4335]" },
    { href: "https://facebook.com/levuminhhoang.287", label: "Facebook", icon: Share2, color: "bg-[#1877f2]" },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[999] flex flex-col-reverse items-end gap-4">
      {/* Nút chính */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.4)] relative z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Danh sách bong bóng mạng xã hội */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col-reverse items-end gap-3 mb-2">
            {socials.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 15 }}
                className={`flex items-center gap-3 group`}
              >
                <span className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                  {social.label}
                </span>
                <div className={`w-12 h-12 rounded-full ${social.color} flex items-center justify-center text-white shadow-lg border border-white/10 group-hover:scale-110 transition-transform`}>
                  <social.icon className="w-5 h-5" />
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
