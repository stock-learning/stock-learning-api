import cron from 'node-cron';
import { RabbitMQServer } from 'stock-learning-rabbitmq';

export const startJobs = () => {
    cron.schedule("0 45 9 * * *", () => RabbitMQServer.getInstance().getAnalyserStub().dailyPredictionStartupHandler()); // prediction startup job(9:45 AM)
    cron.schedule("0 0 18 * * *", () => RabbitMQServer.getInstance().getAnalyserStub().dailyPredictionClosingHandler()); // prediction closing job(6:00 PM)
};