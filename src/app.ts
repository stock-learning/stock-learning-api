import bodyParser from 'body-parser';
import express from 'express';
import { ConsumerMap, RabbitMQServer } from 'stock-learning-rabbitmq';
import { buildApolloServer } from "./common/graphql/graphql-server";
import { Resolvers } from './common/graphql/resolvers';
import { Database } from './common/infra/Database';
import companyNews from './consumers/company-news';
import getAllCompanies from './consumers/get-all-companies';
import getDailyCompanies from './consumers/get-daily-companies';
import infomoneyIbovespaCompanyData from './consumers/infomoney-ibovespa-company-data';
import infomoneyIbovespaHistoricData from "./consumers/infomoney-ibovespa-historic-data";
import infomoneyIbovespaLiveUpdate from './consumers/infomoney-ibovespa-live-update';
import livePrediction from './consumers/live-prediction';
import livePredictionMovement from './consumers/live-prediction-movement';
import persistTweets from './consumers/persist-tweets';
import yahooCompanyHistoricData from './consumers/yahoo-company-historic-data';
import headerCommonsMiddleware from './middleware/header-commons-middleware';
import internalServerErrorMiddleware from "./middleware/internal-server-error-middleware";
import singleCompanyDataByUserResolver from './resolvers/query/company-data-resolver';
import companyStockCurrentValueResolver from './resolvers/query/company-stock-current-value-resolver';
import flutterTesteResolver from './resolvers/query/flutter-teste-resolver';
import loginResolver from './resolvers/query/login-resolver';
import testeResolver from './resolvers/query/teste-resolver';
import tweetResolver from './resolvers/query/tweets-resolver';
import userFollowCompanyResolver from './resolvers/query/user-follow-company-resolver';
import newLiveUpdateResolver from './resolvers/subscription/new-live-update-resolver';
import { startJobs } from './schedule/schedule';


const app = express();
const argv = process.argv.slice(2);

app.use(bodyParser.json());
app.use(headerCommonsMiddleware);

app.use(internalServerErrorMiddleware);

const consumers = ConsumerMap.builder()
    .register(companyNews)
    .register(getAllCompanies)
    .register(getDailyCompanies)
    .register(infomoneyIbovespaCompanyData)
    .register(infomoneyIbovespaHistoricData)
    .register(infomoneyIbovespaLiveUpdate)
    .register(persistTweets)
    .register(livePrediction)
    .register(livePredictionMovement)
    .register(yahooCompanyHistoricData)
    .build();

const resolvers = Resolvers.builder()
    .registerProtectedQuery(tweetResolver)
    .registerProtectedQuery(userFollowCompanyResolver)
    .registerProtectedQuery(companyStockCurrentValueResolver)
    .registerProtectedQuery(singleCompanyDataByUserResolver)
    .registerQuery(flutterTesteResolver)
    .registerQuery(testeResolver)
    .registerQuery(loginResolver)
    .registerSubscription(newLiveUpdateResolver)
    .build();

(async () => {

    try {

        await Database.connect(process.env.DB_CONNECTION_STRING || '');
        console.info('Connected to MongoDB');

        console.info('Registering RabbitMQ consumers');
        await RabbitMQServer.createServer(process.env.RABBITMQ_CONNECTION_STRING || '')
                .usingConsumers(consumers)
                .listenToQueue('stock-learning-api');

        console.info('RabbitMQ API queue consumer is up and running');
        if (argv.indexOf('no-jobs') === -1) {
            startJobs();
            console.info('Schedules have started!');
        }

        const { url, subscriptionsUrl } = await buildApolloServer(resolvers).listen({ port: process.env.PORT || 3000 });

        console.info(`API is up and running on '${url}'`);
        console.info(`Subscriptions are up and running on '${subscriptionsUrl}'`);

    } catch (err) {

        console.error('Something went wrong while initilizing server!');
        console.error(err);

    }

})();
