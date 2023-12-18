const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://broker.mqttdashboard.com');
const motionSensorTopic = 'motion_sensor_topic';
const settingsTopic = 'lamp_settings_topic';

let maxIntensity = 255; // Standaard maximale lichtsterkte
let timeout = 5; // Standaard tijdsinterval in seconden voordat de lamp uitgaat

client.subscribe(motionSensorTopic);
client.subscribe(settingsTopic);

client.on('connect', () => {
  console.log('lamp verbonden met MQTT-broker');
});

client.on('message', (topic, message) => {
  if (topic === motionSensorTopic) {
    const intensity = Math.min(parseInt(message.toString()), maxIntensity);
    if (intensity > 0) {
      console.log(`Lamp aan met intensiteit: ${intensity}`);
      setTimeout(() => {
        console.log('Lamp uit');
      }, timeout * 1000);
    } else {
      console.log('Lamp uit');
    }
  } else if (topic === settingsTopic) {
    const settings = JSON.parse(message.toString());
    maxIntensity = settings.maxIntensity;
    timeout = settings.timeout;
    console.log(`Nieuwe instellingen ontvangen: maxIntensity=${maxIntensity}, timeout=${timeout}`);
  }
});
//simulated_motion_sensor.js simulated_lamp2.js settings_sender.js