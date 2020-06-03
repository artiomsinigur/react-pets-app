import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  useEffect(() => {
    const modal = document.getElementById("modal");
    modal.appendChild(elRef.current);
    return () => modal.removeChild(elRef.current);
  }, []);

  return createPortal(<>{children}</>, elRef.current);
};

export default Modal;
