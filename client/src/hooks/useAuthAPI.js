import { useAuth } from '../contexts/AuthContext';
import useAPI from './useAPI';

export default function useAuthAPI(url, config = { method: 'GET' }) {
  const { token } = useAuth();
  return useAPI(url, {
    ...config,
    headers: { Authorization: `Bearer ${token}`, ...config.headers },
  });
}
