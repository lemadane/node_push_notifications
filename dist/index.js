"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const express = require("express");
const path_1 = require("path");
try {
    const app = express();
    app.use(express.static(path_1.join(__dirname, "client")));
    app.use(express.json());
    app.post("/subscribe", (request, response) => { });
    app.port = 5000;
    app.host = "localhost";
    app.listen(app.port, () => console_1.log(`Server started on port ${app.port}`));
}
catch (err) {
    console_1.error(err.message || err || "Unknown error...");
}
