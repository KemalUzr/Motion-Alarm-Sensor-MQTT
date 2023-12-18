const readline = require('readline');
const mqtt = require('mqtt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = mqtt.connect('mqtt://broker.mqttdashboard.com');

const topic = 'motion_sensor_topic';

client.on('connect', () => {
  console.log("Press enter voor beweging");

  rl.on('line', (input) => {
    console.log("Er is beweging geconstateerd");
    client.publish(topic, '255');
  });
});
