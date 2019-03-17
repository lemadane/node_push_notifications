import { error, log } from "console";
import * as express from "express";
import { join } from "path";
import * as webpush from "web-push";
import { IExpressExt } from "./iexpress-ext";

const app = express() as IExpressExt;

// Set static path
app.use(express.static(join(__dirname, "client")));

app.use(express.json());

const publicVapidKey = "BALBydPXGJ3oYV2HFMYWmGi8bCErZnC754f9a-X05Zzd4DlXC6xP90HQlh_yHgpScuzqH9qrzlU1FZ2WBIsicsY";
const privateVapidKey = "VYMShxQMW5wYqGvFgnlBK6-dFbNZIfxdlpbJliAfz9M";

webpush.setVapidDetails("mailto:lem@email.com", publicVapidKey, privateVapidKey);

// Subscribe Route
app.post("/subscribe", 
	(request: express.Request, response: express.Response) => {
	
	// Get pushSubscription object
	const pushSubscription = request.body as webpush.PushSubscription;

	// Send 201 - resource created
  	response.status(201).json({});
  
  	// Create payload
	const payload = JSON.stringify({ title: "Push Test" });

	// Pass object into sendNotification
	webpush.sendNotification(pushSubscription, payload)
		.catch((err:Error) => error(err));
});

app.port = 5000;

app.listen(app.port,
	() => log(`Server started on port ${app.port}`));
 