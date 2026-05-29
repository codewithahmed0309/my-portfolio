"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return;

      ref.current.style.transform =
        `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,180,80,0.12), transparent 70%)",
        pointerEvents: "none",
        mixBlendMode: "screen",
        opacity: 0.6,
        filter: "blur(40px)",
        zIndex: 2,
      }}
    />
  );
}