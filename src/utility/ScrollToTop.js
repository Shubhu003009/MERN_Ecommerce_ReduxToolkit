import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const currentLocation = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentLocation]);
};

export default ScrollToTop;
