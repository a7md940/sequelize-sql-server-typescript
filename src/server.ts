import express, { Application } from 'express';
import cors from 'cors';
import bodyPraser from 'body-parser';
import config from './config/configKeys';

import Database from './db/database';

import { AppRouter } from './AppRouter';
import './controllers/v1/EmployeeController';
import './controllers/v1/OrganizationController';

import swaggerJsDoc, { SwaggerDefinition } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app: Application = express();
app.use(cors());
app.use(bodyPraser({ extended: true }));
app.use(AppRouter.getInstance());

const environment = process.env.NODE_ENV;
const PORT = config.port;
const HOST: string =
  environment !== 'production' ? `localhost:${PORT}` : 'test.com';

// Swagger API Doc Configuration
const swaggerDefinition: SwaggerDefinition = {
  info: {
    title: 'Sequelize Nodejs App With TypeScript',
    description: 'Endpoints Documentation',
    version: '1.0.0'
  },
  host: HOST,
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      schema: 'bearer',
      in: 'header'
    }
  }
};
const apisFileExtension = environment !== 'production' ? '.ts' : '.js';
const swaggerOptions = {
  swaggerDefinition,
  apis: [`**/*${apisFileExtension}`]
};
const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

Database.sync({
  //   logging: console.log,
  // force: true
});

Database.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(PORT, () => console.log('listen:: ' + PORT));
