import { useEffect } from 'react';

/**
 * Observes all elements with the `.scroll-animate` class and adds
 * `.visible` when they enter the viewport.  Call once in the root component.
 */
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const attach = () => {
      document.querySelectorAll('.scroll-animate').forEach((el) => {
        if (!el.classList.contains('visible')) observer.observe(el);
      });
    };

    // Initial pass
    attach();

    // Re-scan after React renders new content (debounced MutationObserver)
    let timer;
    const mutationObs = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(attach, 150);
    });
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObs.disconnect();
      clearTimeout(timer);
    };
  }, []);
};

export default useScrollAnimation;
