export interface CostCenter {
    id?: string; // Present in response, not in request
    name: string;
    companyID: string;
  }
  
  export interface CostCenterResponse {
    isApiHandled: boolean;
    isRequestSuccess: boolean;
    statusCode: number;
    message: string;
    data: {
      totalCount: number;
      items: CostCenter[];
    };
    exception: any[];
  }