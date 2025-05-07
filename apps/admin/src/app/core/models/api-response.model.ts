export interface ApiResponse<T = any> {
    isApiHandled: boolean;
    isRequestSuccess: boolean;
    statusCode: number;
    message: string;
    data: T | null;
    exception: any[];
  }