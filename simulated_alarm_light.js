const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.mqttdashboard.com');

const alarmTopic = 'my_alarm_topic';

client.subscribe(alarmTopic);

let alarmInterval = null;

client.on('message', (topic, message) => {
  if (topic === alarmTopic) {
    const alarmSettings = JSON.parse(message);

    if (alarmInterval) {
      clearInterval(alarmInterval);
      alarmInterval = null;
    }

    if (alarmSettings.enabled) {
      alarmInterval = setInterval(() => {
        console.log(`Alarmlicht knippert met kleur: ${alarmSettings.color}`);
      }, alarmSettings.frequency);
    } else {
      console.log('Alarmlicht uit');
    }
  }
}); 

// JSON-structuur voor het aansturen van het alarmlicht:
/*
{
  "enabled": true/false,
  "frequency": 2000,
  "color": "RGB(255, 255, 255)"
}
*/
