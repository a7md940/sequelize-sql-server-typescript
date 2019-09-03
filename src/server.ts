import express, { Application } from 'express';
import cors from 'cors';
import bodyPraser from 'body-parser';
import Database from './db/database';
import organizationRouter from './routes/OrganizationRouter';
import employeeRouter from './routes/employeeRouter';



const app: Application = express();
app.use(cors());
app.use(bodyPraser({ extended: true }));

app.use('/organization', organizationRouter)
app.use('/employee', employeeRouter)

Database.sync({
    logging: console.log
})

Database
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch((err: any) => {
    console.error('Unable to connect to the database:', err);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('listen:: ' + PORT))