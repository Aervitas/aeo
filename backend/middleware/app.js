import express from 'express';
const app = express();
import mongoose from 'mongoose';
import { config } from 'dotenv';
const test = config();
import { routerBrother } from '../api/routes/brothers.js';
const brotherRoutes = routerBrother;
import routerPolls from '../api/routes/polls.js';
const pollsRoutes = routerPolls;
import routerLogins from '../api/routes/logins.js';
const loginRoutes = routerLogins;
import bodyParser from 'body-parser';
import cors from 'cors';

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//middleware for parsing json
app.use('/brothers', brotherRoutes);
/*app.use('/polls', pollsRoutes);
app.use('/logins', loginRoutes);*/

//connect to MongoDB
mongoose.connect(process.env.DB_URI).then(result => {
    console.log("MongoDB connected!");
}).catch(err=>{
    console.log(test);
    console.log("MongoDB connection failed. Please ensure service is running and API key is correct. \n" + err);
    return;
});

//error handling for wrong routes
app.use((req, res, next) => {
    const error = new Error('Route not found!');
    error.status = 404;
    next(error);
})
//other errors redir here
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            //whatever the error is, print error (auto throwing)
            message: error.message
        }
    })
})

export { app };