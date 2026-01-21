import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./floatingBubble.scss";

export default function FloatingBubble({
  to = "/contact",
  label = "Contact",
}) {
  const bubbleRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth, innerHeight } = window;

      // Distance entre souris et coin bas droit
      const dx = e.clientX - innerWidth;
      const dy = e.clientY - innerHeight;

      // On limite le déplacement (effet magnétique)
      setOffset({
        x: Math.max(-40, Math.min(0, dx / 12)),
        y: Math.max(-40, Math.min(0, dy / 12)),
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Link
      ref={bubbleRef}
      to={to}
      className="floating-bubble"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    >
      <svg
        className="floating-bubble__icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20 2H4a2 2 0 0 0-2 2v16l4-3h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
      </svg>

      <span className="floating-bubble__label">{label}</span>
    </Link>
  );
}
