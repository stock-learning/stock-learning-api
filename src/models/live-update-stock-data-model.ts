export interface ILiveUpdateStockDataModel {
    name: string;
    fetchTime: Date;
    value?: number;
    close?: number;
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
