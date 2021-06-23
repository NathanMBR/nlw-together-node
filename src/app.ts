"use strict";

// Modules
import express from "express";
const app = express();
import "reflect-metadata";
import "./database/connection"

// Settings
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
import { router } from "./routes";
app.use(router);

// Export
export default app;