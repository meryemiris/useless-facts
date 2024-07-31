import { RefObject, useEffect } from "react";

function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void,
  isOpen: boolean,
) {
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [callback, ref, isOpen]);
}

export default useClickOutside;
