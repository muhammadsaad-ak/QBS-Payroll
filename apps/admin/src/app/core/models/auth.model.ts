export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  name: string;
  email: string;
  userId: string;
  userType: string;
  roleAndActions: { actions: { actionName: string }[] }[];
}

export interface UserData {
  name: string;
  userId: string;
  userType: string;
}