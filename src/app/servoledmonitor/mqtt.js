// mqtt.js
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

client.on('message', (topic, message) => {
  const payload = message.toString();
  console.log(`Received message on topic ${topic}: ${payload}`);
});

module.exports = client;
