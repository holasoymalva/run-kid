# run-kid 🚀

> Build AI-powered web apps in seconds, not days.

[![npm version](https://img.shields.io/npm/v/run-kid.svg)](https://www.npmjs.com/package/run-kid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

run-kid is a revolutionary Node.js framework that lets you create interactive, AI-powered web applications with the simplicity of a script. Think Streamlit's elegance meets Node.js's power, supercharged with LLM capabilities.

## 🌟 Why run-kid?

- **⚡️ Lightning Fast Development**: Build full-stack apps in minutes
- **🤖 AI-First**: Native integration with Claude and other LLMs
- **🔄 Real-time Updates**: Instant UI updates with WebSocket
- **📊 Rich Components**: From charts to chat interfaces
- **🎯 Zero Frontend Knowledge Required**: Just write Node.js

## 🚀 Quick Start

```bash
# Install run-kid
npm install run-kid

# Create your first app
touch app.js
```

```javascript
// app.js
const RunKid = require('run-kid');
const app = new RunKid();

app.init(3000);
app.header('Welcome to the Future! 🚀');
app.text('Building AI apps has never been easier.');

// Add an AI-powered chat interface
app.chatInput({
    onSubmit: async (message) => {
        app.chatMessage('user', message);
        const response = await app.chat('anthropic', [{
            role: 'user',
            content: message
        }]);
        app.chatMessage('assistant', response.content);
    }
});
```

## 🎯 Key Features

### 💡 Instant UI Components
```javascript
// Add interactive components with zero HTML/CSS
app.button('Click Me!', () => app.text('Clicked!'));
app.input('Your name:', (value) => app.text(`Hello, ${value}!`));
```

### 📊 Data Visualization
```javascript
// Create beautiful charts instantly
app.chart([{
    x: [1, 2, 3],
    y: [10, 20, 30],
    type: 'scatter'
}]);
```

### 🤖 AI Integration
```javascript
// Chat with Claude in just a few lines
const response = await app.chat('anthropic', [{
    role: 'user',
    content: 'Explain quantum computing'
}]);
```

### 🔄 Real-time State Management
```javascript
// State updates are instantly reflected in UI
app.setState('counter', 0);
app.button('Increment', () => {
    const count = app.getState('counter') + 1;
    app.setState('counter', count);
});
```

## 🛠 Installation

```bash
# Create a new project
mkdir my-run-kid-app
cd my-run-kid-app

# Initialize npm
npm init -y

# Install run-kid and dependencies
npm install run-kid express ws axios dotenv
```

## 💻 Usage Examples

### AI Chat Application
```javascript
require('dotenv').config();
const RunKid = require('run-kid');

const app = new RunKid({
    llm: {
        anthropic: {
            apiKey: process.env.ANTHROPIC_API_KEY
        }
    }
});

app.init(3000);
app.header('Chat with AI');

app.chatInput({
    placeholder: 'Ask anything...',
    onSubmit: async (message) => {
        // Handle chat interaction
    }
});
```

### Data Dashboard
```javascript
const app = new RunKid();
app.init(3000);

app.header('Sales Dashboard');
app.chart(salesData, {
    title: 'Monthly Revenue',
    type: 'bar'
});
```

## 🔧 Configuration

```javascript
const config = {
    llm: {
        anthropic: {
            apiKey: process.env.ANTHROPIC_API_KEY
        }
    }
};

const app = new RunKid(config);
```

## 🗺 Roadmap

- [ ] More LLM providers (OpenAI, Cohere, etc.)
- [ ] Advanced component library
- [ ] File upload handling
- [ ] Database integrations
- [ ] Authentication system
- [ ] Custom themes
- [ ] CLI tool for project scaffolding

## 🤝 Contributing

We're building the future of rapid AI application development! Contributions are welcome:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT © [Malva](https://github.com/holasoymalva)

## 🙏 Acknowledgments

- Inspired by Streamlit
- Built with Node.js
- Powered by Claude API

## 📚 Documentation

For more detailed documentation, examples, and contribution guidelines, please visit our [Wiki](https://github.com/holasoymalva/run-kid/wiki).

## 🐛 Issues

Found a bug or have a feature request? Please open an [issue](https://github.com/holasoymalva/run-kid/issues).

## 📣 Stay Updated

- Follow [@holasoymalva](https://github.com/holasoymalva) on GitHub
- Star this repository to show your support
- Watch this repository to get notified about new releases

---

Made with ❤️ by [holasoymalva](https://github.com/holasoymalva) in Mexico City 🇲🇽
