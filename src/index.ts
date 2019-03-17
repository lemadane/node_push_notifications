import { error, log } from 'console';
import * as express from 'express';
import { join } from 'path';
import * as webpush from 'web-push';

const app = express()

// Set static path
app.use(express.static(join(__dirname, "client")));

app.use(express.json());

const publicVapidKey = "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

// Subscribe Route
app.post("/subscribe", 
	(request: express.Request, response: express.Response) => {
	
	// Get pushSubscription object
	const subscription = request.body as webpush.PushSubscription;

	// Send 201 - resource created
  	response.status(201).json({});
  
  	// Create payload
	const payload = JSON.stringify({ title: "Push Test" });

	// Pass object into sendNotification
	webpush.sendNotification(subscription, payload)
		.catch((err:Error) => error(err));
});

app.port = 5000;

app.listen(app.port,
	() => log(`Server started on port ${app.port}`));
 