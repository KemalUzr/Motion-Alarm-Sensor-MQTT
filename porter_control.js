const mqtt = require('mqtt');
const readline = require('readline');

const client = mqtt.connect('mqtt://broker.mqttdashboard.com');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const alarmControlTopic = 'alarm_control_topic';

client.on('connect', () => {
  console.log("Type 1 om het alarm in te schakelen, 0 om uit te schakelen.");

  rl.on('line', (input) => {
    if (input === '1' || input === '0') {
      client.publish(alarmControlTopic, input);
      console.log(`Alarm ${input === '1' ? 'ingeschakeld' : 'uitgeschakeld'}`);
    } else {
      console.log("Ongeldige invoer. Type 1 om het alarm in te schakelen, 0 om uit te schakelen.");
    }
  });
});
