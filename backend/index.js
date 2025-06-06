import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";

import databaseConnection from "./utils/database.js";
import errorHandler from "./handler/errorHandler.js";
import userRoute from './routes/user.route.js';
import imdbRoute from './routes/imdb.route.js';

databaseConnection();

dotenv.config({
    path : '.env'
})

const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
}; 
app.use(cors(corsOptions));

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
app.use("/api/v1/imdb", imdbRoute);


// Error handler middleware (should be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is starting at http://localhost:${PORT}`);
    console.log(`API endpoint should be: http://localhost:${PORT}/api/v1/user`);
})