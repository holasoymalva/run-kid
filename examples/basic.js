// examples/basic.js
const RunKid = require('../src/core');

// Initialize the application
const app = new RunKid();
app.init(3000);

// Add some basic components
app.header('Welcome to RunKid!', 1);
app.text('This is a simple example of what you can do with RunKid.');

// Add a button with a counter
let counter = 0;
app.button('Click me!', () => {
    counter++;
    app.clear();
    app.header('Welcome to RunKid!', 1);
    app.text(`Button clicked ${counter} times!`);
});

// Add an input field
app.input('Enter your name:', (value) => {
    app.text(`Hello, ${value}!`);
});