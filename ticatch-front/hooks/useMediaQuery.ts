import { useEffect, useState } from 'react';

export function useMediaQuery(query: string, defaultState = false): boolean {
  const [matches, setMatches] = useState<boolean>(defaultState);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    media.addEventListener('change', listener);
    setMatches(media.matches);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
