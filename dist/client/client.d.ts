declare const errlog: {
    (message?: any, ...optionalParams: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
declare const log: {
    (message?: any, ...optionalParams: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
declare const PUBLIC_VAPID_KEY = "BALBydPXGJ3oYV2HFMYWmGi8bCErZnC754f9a-X05Zzd4DlXC6xP90HQlh_yHgpScuzqH9qrzlU1FZ2WBIsicsY";
declare function send(): Promise<void>;
declare function urlBase64ToUint8Array(base64String: string): Uint8Array;
