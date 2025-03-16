exports.handleWebSocket = (ws, req) => {
    console.log("🔗 New WebSocket Client Connected");

    ws.send(JSON.stringify({ message: "Welcome to Live Health Updates!" }));

    ws.on("message", (msg) => {
        console.log(`📩 Received Message: ${msg}`);
    });

    ws.on("close", () => {
        console.log("❌ WebSocket Client Disconnected");
    });

    ws.on("error", (error) => {
        console.error("🚨 WebSocket Error:", error.message);
    });
};
