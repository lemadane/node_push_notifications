const errlog = console.error;
const log = console.log;
const PUBLIC_VAPID_KEY = "BALBydPXGJ3oYV2HFMYWmGi8bCErZnC754f9a-X05Zzd4DlXC6xP90HQlh_yHgpScuzqH9qrzlU1FZ2WBIsicsY";
if ("serviceWorker" in navigator) {
    try {
        send().then(e => {
            log('Success send.');
        });
    }
    catch (err) {
        errlog(err);
    }
}
async function send() {
    log("Registering service worker...");
    const register = await navigator.serviceWorker
        .register("/worker.js", { scope: "/" });
    log("Service Worker Registered...");
    log("Registering Push...");
    const subs = await register.pushManager.getSubscription();
    if (subs) {
        subs.unsubscribe();
    }
    const pushSubscription = await register.pushManager.subscribe({
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
        userVisibleOnly: true
    });
    log("Push Registered...");
    log("Sending Push...");
    await fetch("/subscribe", {
        body: JSON.stringify(pushSubscription),
        headers: {
            "content-type": "application/json"
        },
        method: "POST"
    });
    log("Push Sent...");
}
function urlBase64ToUint8Array(base64String) {
    try {
        const padding = "=".repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
    catch (err) {
        errlog(err || "unknown error");
        return null;
    }
}
