"use client";

import { useMagnetic } from "@/hooks/useMagnetic";

export default function CTAButton() {
  const { onMouseMove, onMouseLeave } = useMagnetic();

  return (
    <button
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="px-6 py-3 bg-black text-white rounded-lg"
    >
      Click Me
    </button>
  );
}