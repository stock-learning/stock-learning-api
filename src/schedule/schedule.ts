import moment from 'moment';
import cron from 'node-cron';
import { RabbitMQServer } from 'stock-learning-rabbitmq';
import companyDataController from '../controllers/company-data-controller';
import trackedTwitterAccountController from '../controllers/tracked-twitter-account-controller';

export const startJobs = () => {
    cron.schedule("0 45 9 * * *", () => RabbitMQServer.getInstance().getAnalyserStub().dailyPredictionStartupHandler()); // prediction startup job(9:45 AM)
    cron.schedule("0 0 18 * * *", () => RabbitMQServer.getInstance().getAnalyserStub().dailyPredictionClosingHandler()); // prediction closing job(6:00 PM)
    cron.schedule('0 */5 * * * *', async () => {
        // Live Update of stock data runs every 5 minutes
        const format = 'hh:mm:ss'
        if (moment().isBefore(moment('18:00:00', format)) && moment().isAfter(moment('08:00:00', format))) {
            RabbitMQServer.getInstance()
                .getWebScrapperStub()
                .infomoneyIbovespaLiveUpdate({ initials: await companyDataController.fetchAllCompanyInitials() });
        }
    });
    cron.schedule('0 */15 * * * *', async () => {
        // A request to fetch new tweets runs every 15 minutes
        RabbitMQServer.getInstance()
            .getApiScrapperStub()
            .fetchTweetsByAccount({ accounts: await trackedTwitterAccountController.fetchAllTrackedTwitterAccounts()});
    });
    cron.schedule('* * */4 * * *', async () => {
        RabbitMQServer.getInstance()
            .getApiScrapperStub()
            .fetchCompanyNews({ companies: await companyDataController.fetchAllCompanyNames() });
    });
};