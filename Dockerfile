FROM node:alpine

RUN npm install canvas-sketch-cli -g

# EXPOSE 9966   # Reminder that canvas-sketch default port is 99
