export interface GroupOfCompanyAddRequest {
    company_Name: string;
    primary_Currency: string;
    secondary_Currency?: string;
  }
  
  export interface GroupOfCompanyResponse {
    companyId: string;
    company_Name: string;
    primary_Currency: string;
    secondary_Currency?: string;
  }
  
  export interface GroupOfCompanyListItem {
    code: string;
    name: string;
    primaryCurrency: string;
    secondaryCurrency?: string;
  }