// src/core/websocket.js
const WebSocket = require('ws');

class WebSocketManager {
    constructor(runKid) {
        this.runKid = runKid;
        this.wss = null;
    }

    init(server) {
        this.wss = new WebSocket.Server({ server });
        
        this.wss.on('connection', (ws) => {
            // Send initial state
            ws.send(JSON.stringify({ 
                type: 'state', 
                data: this.runKid.state 
            }));

            // Handle incoming messages
            ws.on('message', (message) => {
                const data = JSON.parse(message);
                this.runKid.eventEmitter.emit(data.event, data.payload);
            });
        });
    }

    broadcastState(state) {
        this.broadcast({ type: 'state', data: state });
    }

    broadcastComponents(components) {
        this.broadcast({ type: 'components', data: components });
    }

    broadcast(message) {
        if (this.wss) {
            this.wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(message));
                }
            });
        }
    }
}

module.exports = WebSocketManager;