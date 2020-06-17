import bodyParser from 'body-parser';
import express from 'express';
import { ConsumerMap, RabbitMQServer } from 'stock-learning-rabbitmq';
import graphqlRouter from "./common/graphql/graphql-route";
import { Database } from './common/infra/Database';
import companyNews from './consumers/company-news';
import getAllCompanies from './consumers/get-all-companies';
import getDailyCompanies from './consumers/get-daily-companies';
import infomoneyIbovespaCompanyData from './consumers/infomoney-ibovespa-company-data';
import infomoneyIbovespaHistoricData from "./consumers/infomoney-ibovespa-historic-data";
import infomoneyIbovespaLiveUpdate from './consumers/infomoney-ibovespa-live-update';
import persistTweets from './consumers/persist-tweets';
import headerCommonsMiddleware from './middleware/header-commons-middleware';
import internalServerErrorMiddleware from "./middleware/internal-server-error-middleware";
import livePrediction from './consumers/live-prediction';
import livePredictionMovement from './consumers/live-prediction-movement';


const app = express();

app.use(bodyParser.json());
app.use(headerCommonsMiddleware);

app.use(graphqlRouter);

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
    .build();

Database.connect(process.env.DB_CONNECTION_STRING || '')
    .then(() => {
        console.info('Connected to MongoDB');
        return new Promise((accept) => accept());
    })
    .then(() => {
        console.info('Registering RabbitMQ consumers');
        return RabbitMQServer.createServer(process.env.RABBITMQ_CONNECTION_STRING || '')
            .usingConsumers(consumers)
            .listenToQueue('stock-learning-api');
    })
    .then(() => {
        console.info('RabbitMQ API queue consumer is up and running');
        app.listen(process.env.PORT);
        console.info(`API is up and running on port ${process.env.PORT}`);
    })
    .catch(err => {
        console.error('Something went wrong while initilizing server!');
        console.error(err);
    });
