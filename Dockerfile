FROM node:alpine

WORKDIR /home/node/app
RUN npm install canvas-sketch-cli -g
RUN npm install canvas-sketch-util --save

# EXPOSE 9966   # Reminder that canvas-sketch default port is 99
