"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const express = require("express");
const path_1 = require("path");
const webpush = require("web-push");
const app = express();
app.use(express.static(path_1.join(__dirname, "client")));
app.use(express.json());
const publicVapidKey = "BALBydPXGJ3oYV2HFMYWmGi8bCErZnC754f9a-X05Zzd4DlXC6xP90HQlh_yHgpScuzqH9qrzlU1FZ2WBIsicsY";
const privateVapidKey = "VYMShxQMW5wYqGvFgnlBK6-dFbNZIfxdlpbJliAfz9M";
webpush.setVapidDetails("mailto:lem@email.com", publicVapidKey, privateVapidKey);
app.post("/subscribe", (request, response) => {
    const pushSubscription = request.body;
    response.status(201).json({});
    const payload = JSON.stringify({ title: "Push Test" });
    webpush.sendNotification(pushSubscription, payload)
        .catch((err) => console_1.error(err));
});
app.port = 5000;
app.listen(app.port, () => console_1.log(`Server started on port ${app.port}`));
