import { error as errlog, log } from "console";
import * as express from "express";
import { join } from "path";
import { IExpressExt } from "./iexpress-ext";

try {
	const app = express() as IExpressExt;

	// Set static path
	app.use(express.static(join(__dirname, "client")));

	app.use(express.json());

	app.post("/subscribe", (request: express.Request, response: express.Response) => {});

	app.port = 5000;
	app.host = "localhost";
	app.listen(app.port, () => log(`Server started on port ${app.port}`));
} catch (err) {
	errlog(err.message || err || "Unknown error...");
}
