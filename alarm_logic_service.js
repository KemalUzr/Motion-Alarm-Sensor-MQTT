const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.mqttdashboard.com');

const motionSensorTopic = 'motion_sensor_topic';
const alarmControlTopic = 'alarm_control_topic';
const alarmLightTopic = 'my_alarm_topic';

let motionDetectors = [];
let alarmEnabled = false;
let alarmTriggered = false;

client.subscribe(motionSensorTopic);
client.subscribe(alarmControlTopic);

client.on('message', (topic, message) => {
  if (topic === motionSensorTopic) {
    const timestamp = Date.now();
    motionDetectors.push(timestamp);

    motionDetectors = motionDetectors.filter(ts => (timestamp - ts) <= 5000);

    if (!alarmTriggered && alarmEnabled && motionDetectors.length >= 2) {
      alarmTriggered = true;
      const alarmSettings = {
        enabled: true,
        frequency: 500,
        color: 'RGB(255, 0, 0)'
      };
      client.publish(alarmLightTopic, JSON.stringify(alarmSettings));
    }
  } else if (topic === alarmControlTopic) {
    alarmEnabled = (message.toString() === '1');

    if (!alarmEnabled) {
      alarmTriggered = false;
      const alarmSettings = {
        enabled: false,
      };
      client.publish(alarmLightTopic, JSON.stringify(alarmSettings));
    }
  }
});
