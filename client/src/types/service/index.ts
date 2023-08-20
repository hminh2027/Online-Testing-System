export interface ServiceMethod {
  method: string;
}

export interface Method {
  path: string;
  getOne: ServiceMethod;
  getMany: ServiceMethod;
  create: ServiceMethod;
  update: ServiceMethod;
  patch: ServiceMethod;
  delete: ServiceMethod;
}

export interface Service extends Partial<Method> {
  path: string;
}
