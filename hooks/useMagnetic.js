export function useMagnetic(strength = 0.15) {
  const onMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onMouseLeave = (e) => {
    e.currentTarget.style.transform = "translate(0px,0px)";
  };

  return { onMouseMove, onMouseLeave };
}