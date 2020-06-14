export interface ITweetModel {
    account: string;
    tweet: string;
    cleanText?: string;
    createdAt: Date;
    statusId: string;
    sentiment?: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'MIXED';
    relatedInitials: string[];
}
