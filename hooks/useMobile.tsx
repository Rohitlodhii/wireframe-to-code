import { useEffect, useState } from "react";

const useMobileScreen = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Function to check screen width
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Initial check
    checkScreenSize();

    // Listen for window resize
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return isMobile;
};

export default useMobileScreen;
