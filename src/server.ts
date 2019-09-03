import express, { Application } from 'express';
import cors from 'cors';
import bodyPraser from 'body-parser';
import Database from './db/database';


// Models..
import { Users } from './models/UserModel';

const app: Application = express();
app.use(cors());
app.use(bodyPraser({ extended: true }));

// const username = 'radwantest';
// const dbName = 'test';
// const dbPassword = 'd95844';


// const sequelize = new Sequelize(dbName, username, dbPassword, {
//     host: 'localhost',
//     dialect: 'mssql'
// });

Database.sync({
    logging: console.log
})

// init(sequelize);

// const Users: any = sequelize.import('./models/UserModel.ts')
Database
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch((err: any) => {
    console.error('Unable to connect to the database:', err);
});

app.get('/users', async (req, res) => {
    const users = await Users.findAll();
    res.json(users)
});
app.post('/user', async (req, res) => {
    console.log(req.body)
    const user = await Users.create(req.body)
    .catch((err: any) => console.log('err is', err))
    // user.save();
    res.send(user)
    
})
    app.listen(3000, () => console.log('listen:: 3000'))
console.log('hello from server');