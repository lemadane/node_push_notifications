"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../firebase-adminsdk.json");
console.log(serviceAccount.type);
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://my-fcm-node.firebaseio.com"
});
