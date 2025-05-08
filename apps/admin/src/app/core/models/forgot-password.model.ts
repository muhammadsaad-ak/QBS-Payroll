export interface ForgetPasswordRequest {
    email: string;
    deviceId: string;
  }
  
  export interface GenerateOTPRequest {
    email: string;
    deviceId: string;
  }
  
  export interface VerifyOTPRequest {
    otp: string;
    email: string;
  }
  
  export interface CreateNewPasswordRequest {
    email: string;
    password: string;
  }
  
  export interface ForgotPasswordResponse {
    message: string;
  }