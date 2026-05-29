const maxRotate = 10;

const handleMove = (e) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY = ((x / rect.width) - 0.5) * maxRotate;
  const rotateX = ((y / rect.height) - 0.5) * -maxRotate;

  el.style.transform = `
    perspective(1200px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateY(-8px)
  `;
};

const reset = (e) => {
  e.currentTarget.style.transform =
    "perspective(1200px) rotateX(0deg) rotateY(0deg)";
};

export default function ProjectCard() {
  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        transition: "transform 0.2s ease",
        willChange: "transform",
      }}
    >
      My Project
    </div>
  );
}