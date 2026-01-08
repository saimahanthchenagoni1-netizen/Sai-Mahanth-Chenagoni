
import React, { useState, useEffect, useRef } from 'react';

export const MouseFace: React.FC<{ 
  isHero?: boolean; 
  onSecretActivate?: () => void;
}> = ({ isHero = false, onSecretActivate }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [isHit, setIsHit] = useState(false);
  const [showOw, setShowOw] = useState(false);
  const [owText, setOwText] = useState("OW!");
  
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        const threshold = 250; 

        if (dist < threshold) {
          const angle = Math.atan2(centerY - e.clientY, centerX - e.clientX);
          const force = (threshold - dist) / 2.5; 
          setOffset({
            x: Math.cos(angle) * force,
            y: Math.sin(angle) * force
          });
        } else {
          setOffset(prev => ({
            x: prev.x * 0.85,
            y: prev.y * 0.85
          }));
        }
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setIsHit(true);
    
    const phrases = ["OW!", "STOP!", "HEY!", "REALLY?", "SYSTEM ERROR!", "BOOTING..."];
    setOwText(phrases[Math.min(newCount - 1, phrases.length - 1)]);
    setShowOw(true);

    setTimeout(() => setIsHit(false), 200);
    setTimeout(() => setShowOw(false), 600);

    if (newCount >= 5) {
      setTimeout(() => {
        onSecretActivate?.();
        setClickCount(0);
      }, 300);
    }
  };

  const getPupilStyle = (eyeRef: React.RefObject<HTMLDivElement | null>) => {
    if (!eyeRef.current) return {};
    const rect = eyeRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
    const distance = Math.min(8, Math.hypot(mousePos.x - centerX, mousePos.y - centerY) / 20);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    return { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` };
  };

  const getSquareRotation = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const rotateY = ((mousePos.x - centerX) / centerX) * 30; 
    const rotateX = -((mousePos.y - centerY) / centerY) * 30;
    
    return {
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${offset.x}px, ${offset.y}px, 100px)`
    };
  };

  if (!isHero) return null;

  return (
    <div 
      ref={containerRef}
      className={`perspective-container floating relative z-40 select-none ${isHit ? 'shake-hit' : ''}`}
      style={{ transition: 'transform 0.08s ease-out' }}
    >
      {showOw && (
        <div className="ow-bubble bg-blue-600 text-white font-black border-2 border-white/20">
          {owText}
        </div>
      )}
      
      <div 
        className={`character-box-3d ${showOw ? 'pain' : ''} cursor-pointer`}
        style={getSquareRotation()}
        onClick={handleClick}
      >
        <div className="box-face face-front group">
          <div className="flex gap-10 pointer-events-none">
            <div ref={eye1Ref} className="eye w-8 h-8">
              <div className="pupil w-4 h-4" style={getPupilStyle(eye1Ref)}></div>
            </div>
            <div ref={eye2Ref} className="eye w-8 h-8">
              <div className="pupil w-4 h-4" style={getPupilStyle(eye2Ref)}></div>
            </div>
          </div>
          <div className="smile pointer-events-none mt-4"></div>
        </div>
        
        <div className="box-face face-back pointer-events-none"></div>
        <div className="box-face face-right pointer-events-none"></div>
        <div className="box-face face-left pointer-events-none"></div>
        <div className="box-face face-top pointer-events-none"></div>
        <div className="box-face face-bottom pointer-events-none"></div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
        </div>
      </div>
      
      <div className="mt-12 text-[11px] font-black uppercase tracking-[1em] opacity-40 text-center">
        {clickCount > 0 ? `ACCESSING... ${clickCount}/5` : 'SECURE SYSTEM'}
      </div>
    </div>
  );
};
