export function observeScrollAnimations() {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll<HTMLElement>('[data-animate]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.2 },
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}
