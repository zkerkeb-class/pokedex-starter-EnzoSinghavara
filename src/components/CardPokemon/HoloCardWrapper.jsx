import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import "./HoloCardWrapper.css";

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

export default function HoloCardWrapper({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const animationRef = useRef({ x: null, y: null });
  const rotateX = useTransform(y, [0, 1], [20, -20]);
  const rotateY = useTransform(x, [0, 1], [-20, 20]);

  function handleMouseMove(e) {
    if (animationRef.current.x) animationRef.current.x.stop();
    if (animationRef.current.y) animationRef.current.y.stop();
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(clamp(px, 0, 1));
    y.set(clamp(py, 0, 1));
  }

  function handleMouseLeave() {
    animationRef.current.x = animate(x, 0.5, { type: "spring", stiffness: 200, damping: 10 });
    animationRef.current.y = animate(y, 0.5, { type: "spring", stiffness: 200, damping: 10 });
  }

  // Shine follows the mouse only on hover
  const shineX = useTransform(x, [0, 1], ["0%", "100%"]);
  const shineY = useTransform(y, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="holo-tilt-wrapper"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="holo-tilt-inner"
        style={{
          rotateX,
          rotateY,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <motion.div
          className="holo-shine"
          style={{
            left: shineX,
            top: shineY,
          }}
        />
        {children}
      </motion.div>
    </div>
  );
} 