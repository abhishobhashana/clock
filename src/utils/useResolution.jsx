import { useEffect, useState } from "react";

export const useResolution = () => {
  const [size, setSize] = useState(0);

  useEffect(() => {
    setSize(window.innerWidth);

    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};
