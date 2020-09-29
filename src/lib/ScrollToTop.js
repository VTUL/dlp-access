import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(props) {
  const location = useLocation();
  const search = window.location.search;

  useEffect(() => {
    const body = document.body;
    window.setTimeout(function() {
      body.scrollTo(0, 0);
    }, 10);
  }, [location.pathname, search, props.paginationClick]);

  return null;
}
