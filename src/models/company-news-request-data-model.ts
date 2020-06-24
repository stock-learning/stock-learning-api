export interface CompanyNewsRequestDataModel {
    initials: string;
    query: string;
    startDate?: string; // yyyy-MM-DD
    endDate: string; // yyyy-MM-DD
}