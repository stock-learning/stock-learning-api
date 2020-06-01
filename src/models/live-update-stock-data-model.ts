export interface ILiveUpdateStockDataModel {
    name: string;
    fetchTime: Date;
    previousClosing?: number;
    open?: number;
    business?: number;
    quantity?: number;
    volume?: number;
    min?: number;
    max?: number;
    variationDay?: number;
    variationMonth?: number;
    variationYear?: number;
    variation52weeks?:number;
}
