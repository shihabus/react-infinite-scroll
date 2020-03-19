import React from "react";

// DESCRIPTION
// A custom hook, which returns a bool,
// when the component passed as ref is in view port

// PARAMS
/**
 *
 * @ref reference to a SINGLE dom element(complete ref)
 * @option (Object) IntersectionObserver options {rootMargin, threshold, root}
 */

function useIsOnScreenHook(ref, option = {}) {
  const [isIntersecting, setIntersecting] = React.useState(false);
  const observerInstance = new IntersectionObserver(([entry]) => {
    setIntersecting(entry.isIntersecting);
  }, option);
  React.useEffect(() => {
    if (ref.current) {
      if (ref.current) {
        observerInstance.observe(ref.current);
      }
    }
    return () => {
      if (ref.current) {
        observerInstance.unobserve(ref.current);
      }
    };
  }, [observerInstance, option, ref]);

  return isIntersecting;
}

export default useIsOnScreenHook;
