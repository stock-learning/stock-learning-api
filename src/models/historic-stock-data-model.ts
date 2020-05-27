export interface IHistoricStockDataModel {
    name: string;
    date: Date;
    open?: number;
    close?: number;
    variation?: number;
    min?: number;
    max?: number;
    volume?: number;
}
