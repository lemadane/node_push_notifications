"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
const errlog = console.error;
const log = console.log;
try {
    log("Service Worker Loaded...");
    self.addEventListener("push", (e) => {
        const data = e.data.json();
        log("Push Recieved...");
        const window = self;
        window.registration.showNotification(data.title, {
            body: "Notified by Lemuel!",
            icon: "https://avatars3.githubusercontent.com/u/11367?v=4"
        });
    });
}
catch (err) {
    errlog(err.message);
}
