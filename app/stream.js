export default class Stream {
    static init(domain, api, access_token = null) {
        this.url = "wss://" + domain + api.url + "?access_token=" + access_token + "&stream=" + api.stream;
        this.ws = new WebSocket(this.url);
    }

    static open() {
        return new Promise((resolve) => {
            this.ws.onopen = () => {
                console.log("[WS]websocket opened:" + this.url);
                resolve();
            };
        });
    }

    static receive(callback) {
        this.ws.onmessage = (event) => {
           callback(JSON.parse(event.data));
        };
    }

    static close() {
        return new Promise((resolve) => {
            if(!this.ws || !this.ws.close){
                resolve(1001);
                return;
            }
            this.ws.onclose = (event) => {
                console.log("[WS]websocket closed:" + this.url);
                resolve(event.code);
            };
            this.ws.close();
        });
    }

    static onerror() {
        return new Promise((resolve) => {
            this.ws.onerror = (event) => {
                console.log("[WS]websocket error:" + this.url);
                resolve(event);
            };
        });
    }
}