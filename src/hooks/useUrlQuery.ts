import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export default function useUrlQuery() {
  const searchParams = useSearchParams();

  // Memoize the query object to avoid unnecessary re-renders
  return useMemo(() => {
    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      query[key] = value;
    });
    return query;
  }, [searchParams]);
}
