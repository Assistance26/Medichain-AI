const WebSocket = require("ws");

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("🔗 New WebSocket connection");

        ws.on("message", (message) => {
            console.log(`📩 Received: ${message}`);
        });

        ws.on("close", () => {
            console.log("❌ WebSocket connection closed");
        });
    });

    return wss;
};

module.exports = setupWebSocket; 