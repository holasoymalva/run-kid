// public/js/client.js
class RunKidClient {
    constructor() {
        this.ws = new WebSocket(`ws://${window.location.host}`);
        this.app = document.getElementById('app');
        this.setupWebSocket();
    }

    setupWebSocket() {
        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'components') {
                this.renderComponents(message.data);
            }
        };
    }

    renderComponents(components) {
        this.app.innerHTML = '';
        components.forEach(component => {
            const componentElement = this.createComponent(component);
            if (componentElement) {
                this.app.appendChild(componentElement);
            }
        });
    }

    createComponent(component) {
        const wrapper = document.createElement('div');
        wrapper.className = 'component';

        switch (component.type) {
            case 'text':
                wrapper.textContent = component.content;
                break;

            case 'header':
                const header = document.createElement(`h${component.level}`);
                header.textContent = component.content;
                wrapper.appendChild(header);
                break;

            case 'button':
                const button = document.createElement('button');
                button.textContent = component.label;
                button.onclick = () => {
                    this.ws.send(JSON.stringify({
                        event: component.id,
                        payload: {}
                    }));
                };
                wrapper.appendChild(button);
                break;

            case 'input':
                const label = document.createElement('label');
                label.textContent = component.label;
                const input = document.createElement('input');
                input.type = 'text';
                input.onchange = (e) => {
                    this.ws.send(JSON.stringify({
                        event: component.id,
                        payload: e.target.value
                    }));
                };
                wrapper.appendChild(label);
                wrapper.appendChild(input);
                break;

            case 'chart':
                const chartDiv = document.createElement('div');
                chartDiv.className = 'chart';
                wrapper.appendChild(chartDiv);
                Plotly.newPlot(chartDiv, component.data, component.options);
                break;

            default:
                return null;
        }

        return wrapper;
    }
}

// Initialize the client
new RunKidClient();