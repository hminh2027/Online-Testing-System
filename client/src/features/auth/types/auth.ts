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
  studentId?: string;
}
