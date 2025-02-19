// examples/chat.js
require('dotenv').config();
const RunKid = require('../src/core');
const axios = require('axios');

// Initialize RunKid
const app = new RunKid();

// Initialize chat history
let chatHistory = [];

// Function to call Anthropic API
async function callAnthropic(message) {
    try {
        const response = await axios.post(
            'https://api.anthropic.com/v1/messages',
            {
                model: 'claude-3-opus-20240229',
                max_tokens: 1024,
                messages: [{ role: 'user', content: message }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.ANTHROPIC_API_KEY,
                    'anthropic-version': '2023-06-01'
                }
            }
        );

        if (response.data && response.data.content) {
            return response.data.content[0].text;
        } else {
            console.error('Unexpected API response structure:', response.data);
            throw new Error('Unexpected API response structure');
        }
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
        
        if (error.response?.status === 401) {
            return 'Error: Invalid API key. Please check your ANTHROPIC_API_KEY environment variable.';
        } else if (error.response?.status === 429 || error.response?.status === 529) {
            return 'Error: Rate limit exceeded. Please try again in a few moments.';
        } else {
            return `Error: ${error.response?.data?.error?.message || 'An unexpected error occurred'}`;
        }
    }
}

// Initialize the app
app.init(3000);

// Add header and description
app.header('Chat with Claude 3', 1);
app.text('Welcome to the Claude 3 chat interface! Type your message below:');

// Add warning if no API key
if (!process.env.ANTHROPIC_API_KEY) {
    app.text('⚠️ Warning: No API key found. Please set ANTHROPIC_API_KEY in your .env file.');
}

// Create input field for chat
app.input('Your message:', async (message) => {
    if (!message.trim()) return;
    
    // Clear previous content
    app.clear();
    
    // Restore header and description
    app.header('Chat with Claude 3', 1);
    app.text('Welcome to the Claude 3 chat interface! Type your message below:');
    
    // Add user message to chat history
    chatHistory.push({ role: 'user', content: message });
    
    // Display all messages in chat history
    chatHistory.forEach(msg => {
        app.text(`${msg.role === 'user' ? '👤 You' : '🤖 Claude'}: ${msg.content}`);
    });
    
    // Show loading state
    const loadingText = '🤖 Claude is thinking...';
    app.text(loadingText);
    
    try {
        // Get response from Claude
        const response = await callAnthropic(message);
        
        // Remove loading message
        app.clear();
        app.header('Chat with Claude 3', 1);
        app.text('Welcome to the Claude 3 chat interface! Type your message below:');
        
        // Add Claude's response to chat history if it's not an error message
        if (!response.startsWith('Error:')) {
            chatHistory.push({ role: 'assistant', content: response });
        }
        
        // Display updated chat history
        chatHistory.forEach(msg => {
            app.text(`${msg.role === 'user' ? '👤 You' : '🤖 Claude'}: ${msg.content}`);
        });
        
        // If it was an error message, display it separately
        if (response.startsWith('Error:')) {
            app.text(`⚠️ ${response}`);
        }
        
    } catch (error) {
        console.error('Error:', error);
        app.text('⚠️ Sorry, there was an error processing your request.');
    }
    
    // Recreate input field and clear button
    app.input('Your message:', async (msg) => {
        // This will be called for new messages
    });
    
    app.button('Clear Chat', () => {
        chatHistory = [];
        app.clear();
        app.header('Chat with Claude 3', 1);
        app.text('Welcome to the Claude 3 chat interface! Type your message below:');
        app.input('Your message:', async (msg) => {
            // This will be called for new messages
        });
        app.button('Clear Chat', () => {
            // This will be called when clear is clicked
        });
    });
});

// Add initial clear button
app.button('Clear Chat', () => {
    chatHistory = [];
    app.clear();
    app.header('Chat with Claude 3', 1);
    app.text('Welcome to the Claude 3 chat interface! Type your message below:');
    app.input('Your message:', async (msg) => {
        // This will be called for new messages
    });
    app.button('Clear Chat', () => {
        // This will be called when clear is clicked
    });
});