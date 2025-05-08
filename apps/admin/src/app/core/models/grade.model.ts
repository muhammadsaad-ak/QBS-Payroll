// grade.model.ts
export interface Grade {
    companyId: string;
    effectiveDate: string;
    gradeAreaName: string;
    status: boolean;
  }
  
  export interface GradeResponse {
    data: Grade[];
    totalCount: number;
  }