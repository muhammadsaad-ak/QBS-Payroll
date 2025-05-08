export interface GroupOfCompanyAddRequest {
  company_Name: string;
  primary_Currency: string;
  secondary_Currency?: string;
}

export interface GroupOfCompany {
  id: string;
  company_Name: string;
  primary_Currency: string;
  secondary_Currency?: string;
  effective_start_Date: string;
  effective_end_Date: string;
  status: boolean;
}

export interface GroupOfCompanyResponse {
  totalCount: number;
  items: GroupOfCompany[];
}