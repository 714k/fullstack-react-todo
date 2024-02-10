import { useEffect, useState } from "react";

// TODO - Improve hook to support localStorage
export function useFetch(urlEndpoint: string) {
  const [data, setData] = useState([]);
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [urlEndpoint]);

  async function fetchData() {
    try {
      setLoading(true);
      // fetch data
      const response = await fetch(urlEndpoint, { mode:'cors'});
      const dataResponse = await response.json();

      setData(dataResponse);
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false);
    }
  };

  return {data, error, loading};
}