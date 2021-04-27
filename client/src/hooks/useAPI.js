import useAxios from './useAxios';

const apiURL = process.env.REACT_APP_API_URL;
const defaultConfig = { method: 'GET' };

export default function useAPI(url, config = defaultConfig) {
  return useAxios(url, { ...defaultConfig, ...config, baseURL: apiURL });
}
