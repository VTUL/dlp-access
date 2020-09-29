import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteListener({ context, setPathname }) {
  const location = useLocation();

  useEffect(() => {
    setPathname(location.pathname, context);
  }, [location, context, setPathname]);

  return null;
}
