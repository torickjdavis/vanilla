import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = (initialURL, config = null) => {
  const [loading, setLoading] = useState(false);
  const [url, setURL] = useState(initialURL);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    console.debug('Axios Request to', url);
    // only overwrites the response if something changes
    // potentially make the request cancelable?
    // potentially reformat to axios configurable request to allow requests other than GET https://github.com/axios/axios#axios-api
    (async function () {
      setLoading(true);
      try {
        const response = await axios.get(url, config);
        setError(null);
        setResponse(response);
      } catch (error) {
        setError(error);
        if (error.response) setResponse(error.response);
      } finally {
        setLoading(false);
      }
    })();
  }, [url, config]);

  return {
    get loading() {
      return loading;
    },
    get url() {
      return url;
    },
    set url(value) {
      // when destructured, getters are evaluated, and setters are not referenced
      setURL(value); // triggers a new axios request
    },
    get data() {
      return response?.data;
    },
    get error() {
      return error;
    },
    get response() {
      return response;
    },
  };
};

export default useAxios;
