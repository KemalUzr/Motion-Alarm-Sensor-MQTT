const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://broker.mqttdashboard.com');
const topic = 'lamp_settings_topic';

client.on('connect', () => {
  console.log('Verbonden met MQTT-broker');
  
  const settings = {
    maxIntensity: 200, // Maximale lichtsterkte (tussen 0-255)
    timeout: 8 // Tijdsinterval in seconden voordat de lamp uitgaat
  };

  const settingsJson = JSON.stringify(settings);
  client.publish(topic, settingsJson);
  console.log('Lampinstellingen verstuurd');
});