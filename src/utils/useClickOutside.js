import {useEffect, useRef} from "react";

const useClickOutside = (handler) => {
  const elementRef = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (!elementRef.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    }
  });
  return elementRef;
}

export default useClickOutside;