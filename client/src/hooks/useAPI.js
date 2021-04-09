import useAxios from './useAxios';

const apiURL = process.env.REACT_APP_API_URL;

export default function useAPI(url, config = { method: 'GET' }) {
  return useAxios(url, { ...config, baseURL: apiURL });
}
