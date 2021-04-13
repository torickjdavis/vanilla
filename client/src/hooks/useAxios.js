import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = (url, config = { method: 'GET' }) => {
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (refresh) {
      console.debug('Axios Request to', url, config);
      // potentially make the request cancelable?
      (async function () {
        setLoading(true);
        try {
          const response = await axios({
            url,
            ...config,
          });
          setResponse(response);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
          setRefresh(false);
        }
      })();
    }
  }, [url, refresh]); // adding config causes infinite loop (not sure why)

  return {
    loading,
    refresh: () => setRefresh(true),
    response,
    data: response?.data,
    error,
  };
};

export default useAxios;
