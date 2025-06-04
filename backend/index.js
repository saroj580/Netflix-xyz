import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import databaseConnection from "./utils/database.js";
import errorHandler from "./handler/errorHandler.js";
import userRoute from './routes/user.route.js';

databaseConnection();

dotenv.config({
    path : '.env'
})

const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).json(
        {
            message: "Hello from backend",
            success : true
        }
    )
})

//routes/api
app.use("/api/v1/user", userRoute);


// Error handler middleware (should be after routes)
app.use(errorHandler);

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is starting at http://localhost:${process.env.PORT}`);
})