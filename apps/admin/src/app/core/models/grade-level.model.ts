export interface GradeLevel {
    id: string;
    companyId: string;
    companyName: string;
    gradeLevel: string;
    effectiveDate?: string;
    status: boolean;
}

export interface GradeLevelResponse {
    data: {
        totalCount: number;
        items: GradeLevel[];
    };
    isApiHandled?: boolean;
    isRequestSuccess?: boolean;
    statusCode?: number;
    message?: string;
    exception?: any[];
}
