"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const express = require("express");
const path_1 = require("path");
const webpush = require("web-push");
const app = express();
app.use(express.static(path_1.join(__dirname, "client")));
app.use(express.json());
const publicVapidKey = "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";
webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);
app.post("/subscribe", (request, response) => {
    const subscription = request.body;
    response.status(201).json({});
    const payload = JSON.stringify({ title: "Push Test" });
    webpush.sendNotification(subscription, payload)
        .catch((err) => console_1.error(err));
});
app.port = 5000;
app.listen(app.port, () => console_1.log(`Server started on port ${app.port}`));
