import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Stickman() {
  const [position, setPosition] = useState({ x: -100, y: 0 });
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [state, setState] = useState('narutorun'); // 'narutorun', 'moonwalk', 'ninja-jump', 'ceiling-hang'
  const [jumpOffset, setJumpOffset] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Placement near bottom of viewport
    const updateYPosition = () => {
      const bottomBound = window.innerHeight - 90;
      setPosition(prev => ({ ...prev, y: bottomBound }));
    };

    updateYPosition();
    window.addEventListener('resize', updateYPosition);

    // Animation & movement loop
    const interval = setInterval(() => {
      setPosition(prev => {
        let speed = 4;
        if (state === 'narutorun') speed = 8.5;
        if (state === 'moonwalk') speed = -2.5;
        if (state === 'ceiling-hang') speed = 3; // slower crawl

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

        // Randomly trigger Ninja Jump or Ceiling Hang to wander UI without cluttering center screen
        if (Math.random() < 0.01 && state !== 'ninja-jump' && state !== 'ceiling-hang') {
          const rand = Math.random();
          if (rand < 0.6) {
            // Initiate a cool backflip jump
            setState('ninja-jump');
            setRotation(direction === 1 ? 360 : -360);
            
            // Simulating high jump arc
            let t = 0;
            const jumpInt = setInterval(() => {
              t += 0.08;
              const height = Math.sin(t * Math.PI) * 220; // jump up to 220px high
              setJumpOffset(-height);
              if (t >= 1) {
                clearInterval(jumpInt);
                setJumpOffset(0);
                setRotation(0);
                setState('narutorun');
              }
            }, 30);
          } else {
            // Climb/jump to ceiling for a brief crawl
            setState('ceiling-hang');
            setJumpOffset(-(window.innerHeight - 150)); // Jump to ceiling
            
            setTimeout(() => {
              // Fall back down smoothly
              setJumpOffset(0);
              setState('narutorun');
            }, 4500);
          }
        }

        // State cycles
        if (Math.random() < 0.008 && state !== 'ninja-jump' && state !== 'ceiling-hang') {
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
    // Manual jump trigger
    if (state !== 'ninja-jump') {
      setState('ninja-jump');
      setRotation(direction === 1 ? 360 : -360);
      let t = 0;
      const jumpInt = setInterval(() => {
        t += 0.07;
        const height = Math.sin(t * Math.PI) * 260; // Extra high click jump
        setJumpOffset(-height);
        if (t >= 1) {
          clearInterval(jumpInt);
          setJumpOffset(0);
          setRotation(0);
          setState('narutorun');
        }
      }, 25);
    }
  };

  return (
    <motion.div
      onClick={handleStickmanClick}
      animate={{
        x: position.x,
        y: position.y + jumpOffset,
        scaleX: direction,
        rotate: rotation,
        scaleY: state === 'ceiling-hang' ? -1 : 1, // Flips upside down on ceiling
      }}
      transition={{
        type: "tween",
        ease: "linear",
        duration: 0.04,
        rotate: { type: "tween", duration: 0.6, ease: "easeInOut" }
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
        ) : state === 'ninja-jump' ? (
          /* Ninja Jump: tucked backflip/somersault look */
          <g>
            <circle cx="50" cy="40" r="9" fill="none" stroke="#22d3ee" strokeWidth="4" />
            <line x1="50" y1="49" x2="50" y2="70" stroke="#22d3ee" strokeWidth="4" />
            {/* Tucked arms */}
            <path d="M 50 54 Q 70 54 60 70" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
            <path d="M 50 54 Q 30 54 40 70" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
            {/* Tucked legs */}
            <path d="M 50 70 Q 65 85 50 95" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
            <path d="M 50 70 Q 35 85 50 95" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
          </g>
        ) : state === 'ceiling-hang' ? (
          /* Ceiling hang/climb: Crawling look, upside down (scaleY flips it, so keep standard coordinates) */
          <g>
            <circle cx="50" cy="30" r="9" fill="none" stroke="#22d3ee" strokeWidth="4" />
            <line x1="50" y1="39" x2="50" y2="70" stroke="#22d3ee" strokeWidth="4" />
            {/* Crawling arms touching ceiling */}
            <motion.path
              animate={{
                d: [
                  "M 50 45 L 30 20 L 10 10",
                  "M 50 45 L 35 25 L 20 10",
                  "M 50 45 L 30 20 L 10 10"
                ]
              }}
              transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}
              fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"
            />
            <motion.path
              animate={{
                d: [
                  "M 50 45 L 70 20 L 90 10",
                  "M 50 45 L 65 25 L 80 10",
                  "M 50 45 L 70 20 L 90 10"
                ]
              }}
              transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}
              fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"
            />
            {/* Crawling legs */}
            <motion.path
              animate={{
                d: [
                  "M 50 70 L 35 85 L 25 105",
                  "M 50 70 L 40 80 L 35 95",
                  "M 50 70 L 35 85 L 25 105"
                ]
              }}
              transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}
              fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"
            />
            <motion.path
              animate={{
                d: [
                  "M 50 70 L 65 85 L 75 105",
                  "M 50 70 L 60 80 L 65 95",
                  "M 50 70 L 65 85 L 75 105"
                ]
              }}
              transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}
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
