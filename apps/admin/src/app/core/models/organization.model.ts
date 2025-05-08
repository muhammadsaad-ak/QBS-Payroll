export interface GroupOfCompanyAddRequest {
  company_Name: string;
  primary_Currency: string;
  secondary_Currency?: string;
}

export interface GroupOfCompany {
  id: string;
  company_Name: string;
  cost_Center: string;
  primary_Currency: string;
  secondary_Currency: string;
  parentCompanyId: string | null;
  effectiveDate: string;
  groupofCompanyId: string | null;
  status: boolean;
  isParent: boolean;
  logo: string;
}

export interface GroupOfCompanyResponse {
  totalCount: number;
  items: GroupOfCompany[];
}

export interface AddCompanyRequest {
  company_Name: string;
  cost_Center: string;
  primary_Currency: string;
  secondary_Currency: string;
  group_of_Company: string;
  status: boolean;
  effectiveDate: string;
  isParent: boolean;
  logo: string;
  groupofCompanyId: string;
  parentCompanyID: string;
}