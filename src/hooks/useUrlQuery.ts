import { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function useUrlQuery() {
  const pathname = usePathname();
  const [urlParams, setUrlParams] = useState<URLSearchParams>(
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrlParams(new URLSearchParams(window.location.search));
    }
  }, [pathname]);

  // Memoize the query object to avoid unnecessary re-renders
  return useMemo(() => {
    const query: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      urlParams.forEach((value, key) => {
        query[key] = value;
      });
    }
    return query;
  }, [urlParams]);
}
