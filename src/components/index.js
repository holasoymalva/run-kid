// src/components/index.js
class ComponentManager {
    constructor(runKid) {
        this.runKid = runKid;
        this.components = [];
    }

    addText(content) {
        this.components.push({
            type: 'text',
            content
        });
        this.broadcast();
    }

    addHeader(content, level = 1) {
        this.components.push({
            type: 'header',
            content,
            level
        });
        this.broadcast();
    }

    addButton(label, callback) {
        const id = `button-${Math.random().toString(36).substr(2, 9)}`;
        this.components.push({
            type: 'button',
            label,
            id
        });
        this.runKid.eventEmitter.on(id, callback);
        this.broadcast();
    }

    addInput(label, callback) {
        const id = `input-${Math.random().toString(36).substr(2, 9)}`;
        this.components.push({
            type: 'input',
            label,
            id
        });
        this.runKid.eventEmitter.on(id, callback);
        this.broadcast();
    }

    addChart(data, options = {}) {
        this.components.push({
            type: 'chart',
            data,
            options
        });
        this.broadcast();
    }

    clear() {
        this.components = [];
        this.broadcast();
    }

    broadcast() {
        this.runKid.wsManager.broadcastComponents(this.components);
    }
}

module.exports = ComponentManager;