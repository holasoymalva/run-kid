const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const { EventEmitter } = require('events');

class RunKid {
    constructor() {
        this.app = express();
        this.server = null;
        this.wss = null;
        this.state = {};
        this.components = [];
        this.eventEmitter = new EventEmitter();
    }

    init(port = 3000) {
        this.server = this.app.listen(port, () => {
            console.log(`RunKid app running at http://localhost:${port}`);
        });

        // Set up WebSocket server
        this.wss = new WebSocket.Server({ server: this.server });
        
        // Handle WebSocket connections
        this.wss.on('connection', (ws) => {
            console.log('Client connected');
            // Send initial state
            ws.send(JSON.stringify({ type: 'state', data: this.state }));
            
            // Send initial components
            ws.send(JSON.stringify({ type: 'components', data: this.components }));

            // Handle incoming messages
            ws.on('message', (message) => {
                const data = JSON.parse(message);
                this.eventEmitter.emit(data.event, data.payload);
            });
        });

        // Serve static files
        this.app.use(express.static(path.join(__dirname, '../../public')));
        
        // Main HTML route
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../public', 'index.html'));
        });
    }

    setState(key, value) {
        this.state[key] = value;
        this.broadcastState();
    }

    getState(key) {
        return this.state[key];
    }

    broadcastState() {
        if (this.wss) {
            this.wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'state', data: this.state }));
                }
            });
        }
    }

    text(content) {
        this.components.push({
            type: 'text',
            content
        });
        this.broadcastComponents();
    }

    header(content, level = 1) {
        this.components.push({
            type: 'header',
            content,
            level
        });
        this.broadcastComponents();
    }

    button(label, callback) {
        const id = `button-${Math.random().toString(36).substr(2, 9)}`;
        this.components.push({
            type: 'button',
            label,
            id
        });
        this.eventEmitter.on(id, callback);
        this.broadcastComponents();
    }

    input(label, callback) {
        const id = `input-${Math.random().toString(36).substr(2, 9)}`;
        this.components.push({
            type: 'input',
            label,
            id
        });
        this.eventEmitter.on(id, callback);
        this.broadcastComponents();
    }

    chart(data, options = {}) {
        this.components.push({
            type: 'chart',
            data,
            options
        });
        this.broadcastComponents();
    }

    broadcastComponents() {
        if (this.wss) {
            this.wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'components', data: this.components }));
                }
            });
        }
    }

    clear() {
        this.components = [];
        this.broadcastComponents();
    }
}

module.exports = RunKid;