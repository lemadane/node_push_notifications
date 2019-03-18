// https://firebase.google.com/docs/cloud-messaging/send-message?authuser=0

import { error as errlog, log } from 'console';
import * as firebaseAdmin from 'firebase-admin';
const serviceAccount = require('../firebase-adminsdk.json') as firebaseAdmin.ServiceAccount;

function init() {
	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert(serviceAccount),
		databaseURL: 'https://my-fcm-node.firebaseio.com'
	});
}

async function sendToOne(data: any, token: string) {
	try {
		const msg = {
			data,
			token
		};
		const response = await firebaseAdmin.messaging().send(msg);
		log('Successfully sent message:', response);
	} catch (err) {
		errlog('Error sending message:', err);
	}
}

async function send(data: any, tokens: string[]) {
	try {
		const msg = {
			data,
			tokens
		};
		const response = await firebaseAdmin.messaging().sendMulticast(msg);
		if (response.failureCount > 0) {
			const failedTokens: string[] = [];
			response.responses.forEach((resp, idx) => {
				if (!resp.success) {
					failedTokens.push(tokens[idx]);
				}
			});
			log('List of tokens that caused failures: ' + failedTokens);
		} else {
			log('Successfully sent message:', response);
		}
	} catch (err) {
		errlog('Error sending message:', err);
	}
}

async function sendWithTopic(data: any, topic) {
	try {
		const message = {
			data,
			topic
		};
		const response = await firebaseAdmin.messaging().send(message);
		log('Successfully sent message:', response);
	} catch (err) {
		errlog(err);
	}
}

async function sendWithTopicCombinations(data: any, topicCombinations: string) {
	try {
		const message = {
			data,
			condition: topicCombinations
		};
		const response = await firebaseAdmin.messaging().send(message);
		log('Successfully sent message:', response);
	} catch (err) {
		errlog(err);
	}
}

