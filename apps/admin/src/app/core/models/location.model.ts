export interface Location {
    id?: string; // Present in response, not in request
    companyID: string;
    locationName: string;
    locationType: string;
    shortCode: string;
    emailAddress: string;
    contactNumber: string;
    alternateContactNumber: string;
    address1: string;
    address2: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    companyName: string;
    timeZone: string;
    effectiveDate?: string;
    status?: boolean;
  }
  
  export interface LocationResponse {
    isApiHandled: boolean;
    isRequestSuccess: boolean;
    statusCode: number;
    message: string;
    data: {
      totalCount: number;
      items: Location[];
    };
    exception: any[];
  }