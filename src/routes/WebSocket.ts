import { Elysia } from "elysia";

const port = Number(Bun.env.PORT || process.env.PORT || 3000);

const allClients = new Set<any>();

const webSocket = new Elysia()
    .ws("/ws", {
        open(ws) {
            console.log("Client connected");
            allClients.add(ws);
        },

        message(ws, msg) {
            console.log("Received from client:", msg);
            ws.send(`Server got: ${msg}`);
        },

        close(ws) {
            console.log("Client disconnected");
            allClients.delete(ws);
        }
    });


function broadCastMsg(msg: string) {
    for (const ws of allClients) {
        ws.send(msg);
    }
}
setInterval(() => {
    broadCastMsg("TEST 112");
}, 1000);

export { webSocket };