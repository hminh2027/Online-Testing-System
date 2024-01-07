import type { User } from '@/features/user';
import type { ResponseItem } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  fullname: string;
  isTeacher: boolean;
  phone?: string;
  birth?: Date;
  school?: string;
}

export interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  fullname: string;
  isTeacher: boolean;
  phone?: string;
  birth?: Date;
  school?: string;
}

type AuthResponse = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: User;
};

export interface UTCResponse {
  data: {
    email: string;
    firstName: string;
    lastName: string;
    birth: string;
    studentId: string;
    tel: string;
  };
  error: string;
}
export type ResAuthItem = ResponseItem<AuthResponse>;
