// src/hooks/useFetch.js
import { useState, useEffect, useRef } from "react";

export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setData(null);

    fetchFn()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Something went wrong");
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, deps);

  return { data, loading, error };
}
