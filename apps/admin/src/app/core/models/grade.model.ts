// grade.model.ts
export interface Grade {
  companyId: string;
  effectiveDate: string;
  gradeAreaName: string;
  status: boolean;
}

export interface GradeResponse {
  isApiHandled: boolean;
  isRequestSuccess: boolean;
  statusCode: number;
  message: string;
  data: {
    totalCount: number;
    items: Grade[];
  };
  exception: any[];
}