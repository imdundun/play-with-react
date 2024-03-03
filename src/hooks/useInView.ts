import { useEffect, useMemo, useState } from "react";
import useRefOf from "./useRefOf";

interface InViewOptions extends IntersectionObserverInit {
  onChange?: (inView: boolean) => void;
}

export default function useInView(
  ref: React.RefObject<HTMLElement>,
  { onChange, threshold, root, rootMargin }: InViewOptions = {}
) {
  const [inView, setInView] = useState(false);
  const onChangeRef = useRefOf(onChange);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          for (const { isIntersecting: inView } of entries) {
            setInView(inView);
            onChangeRef.current?.(inView);
          }
        },
        {
          threshold,
          root,
          rootMargin,
        }
      ),
    [onChangeRef, root, rootMargin, threshold]
  );

  useEffect(() => {
    if (!ref.current) return;
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [observer, ref]);

  return inView;
}
