import bodyParser from 'body-parser';
import express from 'express';
import database from "./infra/database";
import rabbitMQ from './infra/rabbitmq';
import headerCommonsMiddleware from './middleware/header-commons-middleware';
import internalServerErrorMiddleware from "./middleware/internal-server-error-middleware";
import consumers from './rabbitmq/consumers';
import graphqlRouter from "./routes/graphql-route";
import analyserStub from './stubs/analyser-stub';


const app = express();

app.use(bodyParser.json());
app.use(headerCommonsMiddleware);

app.use(graphqlRouter);

app.use(internalServerErrorMiddleware);

database
    .connect()
    .then(() => {
        console.info('Connected to MongoDB');
        return rabbitMQ.connect();
    })
    .then(() => {
        console.info('Connected to RabbitMQ');
        rabbitMQ.setConsumers(consumers);
        console.info('RabbitMQ message consumers are registered');
        app.listen(process.env.PORT);
        analyserStub().helloWorld({ helloWorld: 'toma no cu' })
        console.info(`Server is up and running on port ${process.env.PORT}!`);
    })
    .catch(err => {
        console.error('Something went wrong while initilizing server!');
        console.error(err);
    });
