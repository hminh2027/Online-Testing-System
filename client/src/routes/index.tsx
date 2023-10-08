import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { storage } from '@/utils';

export function AppRoutes() {
  const token = storage.getToken();

  const routes = token ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes]);

  return <>{element}</>;
}
