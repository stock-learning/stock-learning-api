import { ITimelineModel } from '../models/timeline-data-model';
import { CompanyDataDocument } from '../documents/company-data-document';
import { PredictionDocument } from '../documents/prediction-document';
import { PredictionPercentageDocument } from '../documents/prediction-percentage-document';

export class LiveUpdateStockDataController {

    public async getAsyncData(): Promise<ITimelineModel[]> {
        const companies : any[] = await CompanyDataDocument.find().select({ initials: 1, name: 1, description: 1, _id: 0 });
        const data : any[] = [];

        for (const company of companies) {
            let percentage = 0;
            let positive = false;
            const predicts : any[] = await PredictionDocument.find({initials: {$eq: company.initials}}).sort({createdAt: -1}).limit(2);
            if (predicts.length === 2) {
                positive = this.isPositive(predicts[0].totalReturn, predicts[1].totalReturn);
                if (positive) {
                    percentage = this.getPercentage(predicts[0].totalReturn, predicts[1].totalReturn);
                } else {
                    percentage = this.getPercentage(predicts[1].totalReturn, predicts[0].totalReturn);
                }

                if (percentage === 0) {
                    const oldPercentage = await PredictionPercentageDocument.findOne({initials: {$eq: company.initials}});
                    if (oldPercentage != null) {
                        percentage = oldPercentage.porcentage;
                        positive = oldPercentage.isPositive;
                    }
                } else {
                    await PredictionPercentageDocument.deleteMany({initials: company.initials});
                    await PredictionPercentageDocument.create({initials: company.initials, porcentage: percentage, isPositive: positive});
                }
            }

            data.push({
                initials: company.initials,
                name: company.name,
                logoUrl: 'https://sjcdh.rs.gov.br/themes/modelo-noticias/images/outros/TH_imgSemImagem.png',
                description: company.description,
                porcentage: percentage,
                isPositive: positive
            });
        }
        return data;
    }

    private isPositive(current: number, old: number): boolean {
        return current > old;
    }

    private getPercentage(maxValue: number, minValue: number): number {
        if (minValue === 0) {
            return 0;
        }

        return Math.abs(((maxValue - minValue) / minValue) * 100);
    }
}

export default new LiveUpdateStockDataController();