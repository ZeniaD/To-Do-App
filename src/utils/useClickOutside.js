import {useEffect, useRef} from "react";

let useClickOutside = (handler) => {
  let element = useRef();

  useEffect(() => {
    let handleClick = (e) => {
      if (!element.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    }
  });

  return element;
}

export default useClickOutside;