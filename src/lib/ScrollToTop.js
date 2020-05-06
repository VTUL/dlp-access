import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(props) {
  const { pathname } = useLocation();
  const search = window.location.search;

  useEffect(() => {
    const body = document.body;
    body.scrollTo(0, 0);
  }, [pathname, search, props.paginationClick]);

  return null;
}
