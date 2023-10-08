import type { Resource } from '@/types';

export interface User extends Resource {
  email: string;
  fullname: string;
  password: string;
  isTeacher: boolean;
  phone: string;
  birth: Date;
  school: string;
  studentId: string;
  imageUrl: string;
}
