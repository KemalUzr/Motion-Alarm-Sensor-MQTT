# Alarm-Motion-Sensor-MQTT
# IoT Motion Sensor and Lamp Simulator

This project simulates an IoT environment with a motion sensor and a controllable lamp using Node.js and MQTT. The motion sensor triggers the lamp to turn on when motion is detected, and the lamp's intensity is adjustable.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Simulated Motion Sensor](#simulated-motion-sensor)
- [IoT Lamp (Actuator)](#iot-lamp-actuator)
- [MQTT Broker](#mqtt-broker)

## Introduction

This project consists of two simulated devices: a motion sensor and an IoT lamp. The motion sensor sends MQTT messages when motion is detected, and the lamp reacts to these messages by adjusting its light intensity. Also the porter can activate the alarm that changes the light into alarm setting.

## Prerequisites

Before running the simulation, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Simulated Motion Sensor
The simulated motion sensor script (motion-sensor.js) uses the mqtt package to send a motion detection message (255) to the specified MQTT broker topic when the user presses Enter.

## IoT Lamp (Actuator)
The IoT lamp script (iot-lamp.js) subscribes to the motion sensor's topic, reacting to incoming messages. When a motion detection message (255) is received, the lamp turns on, and its light intensity is published back to the broker.

## MQTT Broker
This project uses the MQTT broker broker.mqttdashboard.com for communication between the simulated devices. No authentication or TLS is required.



