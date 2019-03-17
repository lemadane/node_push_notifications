import { IWindowExt } from "./iwindow-ext";
const errlog = console.error;
const log = console.log;

try {
	log("Service Worker Loaded...");

	self.addEventListener("push", (e) => {
		const data = (e as NotificationOptions).data.json();
		log("Push Recieved...");
		const window = self as IWindowExt;
		window.registration.showNotification(data.title, {
			body: "Notified by Lemuel!",
			icon: "https://avatars3.githubusercontent.com/u/11367?v=4"
		});
	});
} catch (err) {
	errlog(err.message);
}
