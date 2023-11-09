const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the cors module
const mqtt = require('mqtt');

const MQTT_BROKER_URL = 'mqtt://broker.mqtt-dashboard.com';
const MQTT_TOPIC = 'hafidzganteng/statusServoWeb';

const client = mqtt.connect(MQTT_BROKER_URL);

client.on('connect', () => {
  client.subscribe(MQTT_TOPIC, (err) => {
    if (!err) {
      console.log(`Connected to MQTT broker and subscribed to topic: ${MQTT_TOPIC}`);
    }
  });
});

const app = express();
app.use(cors({ origin: '*' }));

const server = http.createServer(app);
const io = socketIo(server, {
    cors:{
        origin: '*'
    }
});

// Use the cors middleware with appropriate configuration

io.on('connection', (socket) => {
  console.log('A client has connected to the WebSocket.');

  socket.on('disconnect', () => {
    console.log('A client has disconnected from the WebSocket.');
  });

  client.on('message', (topic, message) => {
    const payload = message.toString();
    io.emit('mqttMessage', parseInt(payload, 10));
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001.');
});
