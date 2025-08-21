import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function SimpleSagFollower() {
  // Track mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth follow with spring
  const x = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        style={{
          x,
          y,
          position: "fixed",
          top: 0,
          left: 0,
        }}
        className="opacity-50 w-16 h-16 rounded-full bg-blue-400 shadow-lg pointer-events-none"
      />
      
    </>
  );
}
