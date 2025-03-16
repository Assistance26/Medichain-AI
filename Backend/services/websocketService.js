let clients = [];

/**
 * Initializes WebSocket server and manages client connections.
 * @param {Object} wss - WebSocket server instance
 */
const setupWebSocket = (wss) => {
    wss.on("connection", (ws) => {
        console.log("🔗 New WebSocket Client Connected");
        clients.push(ws);

        // Send a welcome message
        ws.send(JSON.stringify({ message: "Welcome to Live Health Updates!" }));

        // Handle incoming messages
        ws.on("message", (msg) => {
            try {
                console.log(`📩 Received Message: ${msg}`);
            } catch (error) {
                console.error("⚠️ Error processing message:", error.message);
            }
        });

        // Handle client disconnection
        ws.on("close", () => {
            console.log("❌ WebSocket Client Disconnected");
            clients = clients.filter((client) => client !== ws);
        });

        // Handle WebSocket errors
        ws.on("error", (error) => {
            console.error("🚨 WebSocket Error:", error.message);
        });
    });
};

/**
 * Sends a real-time update to all connected WebSocket clients.
 * @param {string} message - The update message to be broadcasted.
 */
const sendUpdate = (message) => {
    clients.forEach((client) => {
        if (client.readyState === 1) { // Ensure connection is open
            client.send(JSON.stringify({ update: message }));
        }
    });
};

/**
 * Express API endpoint for triggering real-time WebSocket updates.
 * Can be called via HTTP request.
 */
const sendRealtimeUpdate = (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        sendUpdate(message);
        res.json({ message: "Update sent successfully" });
    } catch (error) {
        console.error("⚠️ Error sending update:", error.message);
        res.status(500).json({ message: "Error sending update", error: error.message });
    }
};

module.exports = { setupWebSocket, sendUpdate, sendRealtimeUpdate };
