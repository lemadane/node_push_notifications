const log = console.log;
const errlog = console.error;
const publicVapidKey = "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
if ("serviceWorker" in navigator) {
    send().catch(err => errlog(err));
}
async function send() {
    log("Registering service worker...");
    const register = await navigator
        .serviceWorker.register("/worker.js", { scope: "/" });
    log("Service Worker Registered...");
    log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        userVisibleOnly: true
    });
    log("Push Registered...");
    log("Sending Push...");
    await fetch("/subscribe", {
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        },
        method: "POST"
    });
    log("Push Sent...");
}
function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
