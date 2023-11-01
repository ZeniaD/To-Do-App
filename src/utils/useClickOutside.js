import {useEffect, useRef} from "react";

let useClickOutside = (handler) => {
  let elementRef = useRef();

  useEffect(() => {
    let handleClick = (e) => {
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