"use strict";

// Modules
import express, { Response, Request, NextFunction } from "express";
const app = express();
import "reflect-metadata";
import "./database/connection"
import "express-async-errors";

// Settings
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Middlewares

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof Error)
        return response.status(400).json({
            error: error.message
        });
    else
        return response.status(500).json({
            status: "error",
            message: "500 Internal Server Error"
        });
});

// Routes
import { router } from "./routes";
app.use(router);

// Export
export default app;