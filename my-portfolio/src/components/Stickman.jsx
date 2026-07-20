import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Stickman() {
  const [position, setPosition] = useState({ x: -100, y: 0 });
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [state, setState] = useState('narutorun'); // 'narutorun', 'moonwalk'

  useEffect(() => {
    // Stickman placement: walks on top of the footer/bottom of the page
    const updateYPosition = () => {
      const bottomBound = window.innerHeight - 80;
      setPosition(prev => ({ ...prev, y: bottomBound }));
    };

    updateYPosition();
    window.addEventListener('resize', updateYPosition);

    // Animation & movement loop
    const interval = setInterval(() => {
      setPosition(prev => {
        // Speed config: Naruto run is very fast (speed 9), Moonwalk is slow and goes backwards relative to face direction!
        let speed = state === 'narutorun' ? 9 : -2.5; 
        let newX = prev.x + (direction * speed);
        let newDir = direction;

        // Bounce back at screen boundaries
        if (newX > window.innerWidth + 50 && direction === 1) {
          newDir = -1;
          newX = window.innerWidth;
        } else if (newX < -150 && direction === -1) {
          newDir = 1;
          newX = -100;
        }

        // Randomly switch states between narutorun and moonwalk
        if (Math.random() < 0.015) {
          setState(prev => prev === 'narutorun' ? 'moonwalk' : 'narutorun');
        }

        return { x: newX, y: prev.y, direction: newDir };
      });
    }, 40);

    return () => {
      window.removeEventListener('resize', updateYPosition);
      clearInterval(interval);
    };
  }, [direction, state]);

  // Keep state matching direction
  useEffect(() => {
    if (position.direction !== undefined && position.direction !== direction) {
      setDirection(position.direction);
    }
  }, [position.x]);

  const handleStickmanClick = () => {
    // Switch state on click
    setState(prev => prev === 'narutorun' ? 'moonwalk' : 'narutorun');
  };

  return (
    <motion.div
      onClick={handleStickmanClick}
      animate={{
        x: position.x,
        y: position.y,
        scaleX: direction,
      }}
      transition={{
        type: "tween",
        ease: "linear",
        duration: 0.04,
      }}
      className="fixed z-[9999] cursor-pointer select-none pointer-events-auto"
      style={{ width: 80, height: 80 }}
    >
      <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
        {state === 'narutorun' ? (
          /* Naruto Run: Body leans forward significantly, arms straight back */
          <g>
            {/* Head (tilted forward) */}
            <circle cx="58" cy="28" r="9" fill="none" stroke="#22d3ee" strokeWidth="4" />
            
            {/* Body (Leaning forward at 45 deg) */}
            <line x1="58" y1="37" x2="40" y2="65" stroke="#22d3ee" strokeWidth="4" />

            {/* Naruto Arms (both pointing straight back behind the runner) */}
            <line x1="48" y1="48" x2="15" y2="40" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
            <line x1="48" y1="48" x2="12" y2="46" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />

            {/* Fast running legs animation */}
            <motion.path
              animate={{
                d: [
                  "M 40 65 L 25 80 L 15 98",
                  "M 40 65 L 42 85 L 50 102",
                  "M 40 65 L 55 78 L 70 95",
                  "M 40 65 L 25 80 L 15 98"
                ]
              }}
              transition={{ repeat: Infinity, duration: 0.25, ease: "linear" }}
              fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"
            />
            <motion.path
              animate={{
                d: [
                  "M 40 65 L 55 78 L 70 95",
                  "M 40 65 L 25 80 L 15 98",
                  "M 40 65 L 42 85 L 50 102",
                  "M 40 65 L 55 78 L 70 95"
                ]
              }}
              transition={{ repeat: Infinity, duration: 0.25, ease: "linear" }}
              fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"
            />
          </g>
        ) : (
          /* Moonwalk: Leans slightly back/upright, moves backwards, arms pose, legs sliding */
          <g>
            {/* Head (nodding animation) */}
            <motion.circle 
              cx="50" 
              animate={{ cy: [28, 31, 28] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
              r="9" fill="none" stroke="#22d3ee" strokeWidth="4" 
            />
            
            {/* Body */}
            <line x1="50" y1="37" x2="50" y2="70" stroke="#22d3ee" strokeWidth="4" />

            {/* Moonwalk arms pose (Holding hat or cool stance) */}
            <line x1="50" y1="45" x2="68" y2="35" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
            <line x1="68" y1="35" x2="65" y2="20" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" /> {/* Hand touching hat area */}
            <line x1="50" y1="45" x2="28" y2="60" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />

            {/* Moonwalk Sliding legs movement */}
            <motion.path
              animate={{
                d: [
                  "M 50 70 L 40 90 L 30 108",   // Flat slide leg
                  "M 50 70 L 50 90 L 60 108",   // Bent pop leg
                  "M 50 70 L 60 90 L 70 108",   // Lifted slide leg
                  "M 50 70 L 40 90 L 30 108"
                ]
              }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
              fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"
            />
            <motion.path
              animate={{
                d: [
                  "M 50 70 L 60 90 L 70 108",
                  "M 50 70 L 40 90 L 30 108",
                  "M 50 70 L 50 90 L 60 108",
                  "M 50 70 L 60 90 L 70 108"
                ]
              }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
              fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </motion.div>
  );
}
