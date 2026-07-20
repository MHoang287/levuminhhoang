import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Stickman() {
  const [position, setPosition] = useState({ x: -100, y: 0 });
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [state, setState] = useState('walking'); // 'walking', 'jumping', 'waving'

  useEffect(() => {
    // Stickman placement: walks on top of the footer/bottom of the page
    const updateYPosition = () => {
      const bottomBound = window.innerHeight - 80;
      setPosition(prev => ({ ...prev, y: bottomBound }));
    };

    updateYPosition();
    window.addEventListener('resize', updateYPosition);

    // Walking animation loop
    const interval = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x + (direction * 4);
        let newDir = direction;

        // Bounce back at screen boundaries
        if (newX > window.innerWidth + 50 && direction === 1) {
          newDir = -1;
          newX = window.innerWidth;
        } else if (newX < -150 && direction === -1) {
          newDir = 1;
          newX = -100;
        }

        // Randomly change state
        if (Math.random() < 0.02) {
          setState(prev => {
            const states = ['walking', 'jumping', 'waving'];
            const next = states[Math.floor(Math.random() * states.length)];
            return next;
          });
        }

        return { x: newX, y: prev.y, direction: newDir };
      });
    }, 40);

    return () => {
      window.removeEventListener('resize', updateYPosition);
      clearInterval(interval);
    };
  }, [direction]);

  // Keep state matching direction
  useEffect(() => {
    if (position.direction !== undefined && position.direction !== direction) {
      setDirection(position.direction);
    }
  }, [position.x]);

  const handleStickmanClick = () => {
    setState('jumping');
    setTimeout(() => setState('waving'), 800);
    setTimeout(() => setState('walking'), 2000);
  };

  // SVG lines representing stickman limbs coordinates based on state
  return (
    <motion.div
      onClick={handleStickmanClick}
      animate={{
        x: position.x,
        y: state === 'jumping' ? position.y - 45 : position.y,
        scaleX: direction,
      }}
      transition={{
        type: "tween",
        ease: "linear",
        duration: 0.04,
        y: { type: "spring", stiffness: 300, damping: 15 }
      }}
      className="fixed z-[9999] cursor-pointer select-none pointer-events-auto"
      style={{ width: 80, height: 80 }}
    >
      <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
        {/* Head */}
        <circle cx="50" cy="30" r="10" fill="none" stroke="#22d3ee" strokeWidth="4" />
        
        {/* Body */}
        <line x1="50" y1="40" x2="50" y2="70" stroke="#22d3ee" strokeWidth="4" />

        {/* Arms */}
        {state === 'waving' ? (
          <>
            <path d="M 50 48 Q 65 35 75 20" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" className="animate-[wiggle_0.5s_ease-in-out_infinite]" />
            <line x1="50" y1="48" x2="25" y2="58" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : state === 'jumping' ? (
          <>
            <line x1="50" y1="45" x2="80" y2="25" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="45" x2="20" y2="25" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : (
          /* Walking arms movement */
          <>
            <motion.line
              x1="50" y1="48"
              animate={{ x2: [30, 70, 30], y2: [62, 55, 62] }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
              stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"
            />
            <motion.line
              x1="50" y1="48"
              animate={{ x2: [70, 30, 70], y2: [55, 62, 55] }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
              stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"
            />
          </>
        )}

        {/* Legs */}
        {state === 'jumping' ? (
          <>
            <line x1="50" y1="70" x2="35" y2="85" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
            <line x1="35" y1="85" x2="40" y2="100" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="70" x2="65" y2="85" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
            <line x1="65" y1="85" x2="60" y2="100" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : (
          /* Walking legs animation */
          <>
            <motion.path
              animate={{
                d: [
                  "M 50 70 L 35 90 L 25 108",
                  "M 50 70 L 50 90 L 55 108",
                  "M 50 70 L 65 90 L 75 108",
                  "M 50 70 L 35 90 L 25 108"
                ]
              }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
              fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"
            />
            <motion.path
              animate={{
                d: [
                  "M 50 70 L 65 90 L 75 108",
                  "M 50 70 L 35 90 L 25 108",
                  "M 50 70 L 50 90 L 55 108",
                  "M 50 70 L 65 90 L 75 108"
                ]
              }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
              fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </motion.div>
  );
}
