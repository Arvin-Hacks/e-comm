const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handle incoming messages from clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  // Send a welcome message to the client
  ws.send('Welcome to the WebSocket server!');
});

// Export the WebSocket server
module.exports = wss;