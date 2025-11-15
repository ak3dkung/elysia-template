class Socket {
    constructor() {
        this.ws = null;
        this.reconnectTimer = null;
        this.reconnectDelay = 1000; // 1s
        this.maxDelay = 10000; // 10s
    }
    createConnection() {
        return new Promise(resolve => {
            const ws = new WebSocket("/ws");
            ws.onopen = () => {
                console.log("Connected to server");
                if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
                this.reconnectDelay = 1000; // reset delay
                this.ws = ws;
                resolve(ws);
                ws.send("Hello from browser");
            };

            ws.onmessage = (event) => {
                console.log(event.data);
            };

            ws.onclose = () => {
                console.log("WS closed. Reconnecting...");
                this.attemptReconnect();
            };
        })
    }
    sendMessage(msg) {
        this.ws.send(msg);
    }
    attemptReconnect() {
        if (this.reconnectTimer) return; // กัน reconnect ซ้ำ

        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            this.reconnectDelay = Math.min(this.reconnectDelay * 1.5, this.maxDelay);
            this.createConnection();
        }, this.reconnectDelay);
    }
} 