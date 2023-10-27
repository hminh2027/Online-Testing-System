import { classRoutes } from '@/features/class/routes';
import { examRoutes } from '@/features/exam/routes';

export const privateRoutes = [...classRoutes, ...examRoutes];
