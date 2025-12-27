import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
interface GearScrollProps {
  onScroll: (direction: 'up' | 'down', delta: number) => void;
}
const GearScroll = ({
  onScroll
}: GearScrollProps) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const gearRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef(0);
  const centerRef = useRef({
    x: 0,
    y: 0
  });
  const calculateAngle = useCallback((clientX: number, clientY: number) => {
    const deltaX = clientX - centerRef.current.x;
    const deltaY = clientY - centerRef.current.y;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  }, []);
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!gearRef.current) return;
    const rect = gearRef.current.getBoundingClientRect();
    centerRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    lastAngleRef.current = calculateAngle(e.clientX, e.clientY);
    setIsDragging(true);
  }, [calculateAngle]);
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const currentAngle = calculateAngle(e.clientX, e.clientY);
    let delta = currentAngle - lastAngleRef.current;

    // Handle angle wraparound
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    setRotation(prev => prev + delta);

    // Determine scroll direction based on rotation
    if (Math.abs(delta) > 0.5) {
      const direction = delta > 0 ? 'down' : 'up';
      onScroll(direction, Math.abs(delta) * 3);
    }
    lastAngleRef.current = currentAngle;
  }, [isDragging, calculateAngle, onScroll]);
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Touch support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!gearRef.current) return;
    const rect = gearRef.current.getBoundingClientRect();
    centerRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    const touch = e.touches[0];
    lastAngleRef.current = calculateAngle(touch.clientX, touch.clientY);
    setIsDragging(true);
  }, [calculateAngle]);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const currentAngle = calculateAngle(touch.clientX, touch.clientY);
    let delta = currentAngle - lastAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    setRotation(prev => prev + delta);
    if (Math.abs(delta) > 0.5) {
      const direction = delta > 0 ? 'down' : 'up';
      onScroll(direction, Math.abs(delta) * 3);
    }
    lastAngleRef.current = currentAngle;
  }, [isDragging, calculateAngle, onScroll]);
  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  const teethCount = 16;
  const innerRadius = 35;
  const outerRadius = 50;
  const toothHeight = 12;
  const generateGearPath = () => {
    const points: string[] = [];
    const angleStep = 2 * Math.PI / teethCount;
    for (let i = 0; i < teethCount; i++) {
      const angle = i * angleStep;
      const nextAngle = (i + 1) * angleStep;
      const midAngle = angle + angleStep / 2;

      // Outer point of tooth
      const outerX = 60 + Math.cos(angle + angleStep * 0.15) * (outerRadius + toothHeight);
      const outerY = 60 + Math.sin(angle + angleStep * 0.15) * (outerRadius + toothHeight);

      // Top of tooth
      const topX1 = 60 + Math.cos(angle + angleStep * 0.35) * (outerRadius + toothHeight);
      const topY1 = 60 + Math.sin(angle + angleStep * 0.35) * (outerRadius + toothHeight);

      // Valley between teeth
      const valleyX = 60 + Math.cos(midAngle) * outerRadius;
      const valleyY = 60 + Math.sin(midAngle) * outerRadius;
      if (i === 0) {
        points.push(`M ${outerX} ${outerY}`);
      }
      points.push(`L ${topX1} ${topY1}`);
      points.push(`L ${valleyX} ${valleyY}`);
      const nextOuterX = 60 + Math.cos(nextAngle + angleStep * 0.15) * (outerRadius + toothHeight);
      const nextOuterY = 60 + Math.sin(nextAngle + angleStep * 0.15) * (outerRadius + toothHeight);
      points.push(`L ${nextOuterX} ${nextOuterY}`);
    }
    points.push('Z');
    return points.join(' ');
  };
  return <motion.div ref={gearRef} className="gear-scroll fixed right-4 md:right-8 top-1/2 -translate-y-1/2 w-28 h-28 md:w-32 md:h-32 z-40 select-none" initial={{
    opacity: 0,
    x: 50
  }} animate={{
    opacity: 1,
    x: 0
  }} transition={{
    delay: 0.5,
    duration: 0.5
  }} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse-glow" />
      
      {/* Main gear SVG */}
      
      
      {/* Instructions tooltip */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: isDragging ? 0 : 0.7
    }} className="absolute -left-24 top-1/2 -translate-y-1/2 text-xs font-mono text-primary/70 whitespace-nowrap hidden md:block">
        <div className="flex items-center gap-2">
          
        </div>
      </motion.div>
    </motion.div>;
};
export default GearScroll;