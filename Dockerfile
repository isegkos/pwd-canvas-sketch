FROM node:alpine

WORKDIR /home/node/app
RUN npm install canvas-sketch-cli -g
RUN npm install canvas-sketch-util
RUN npm install @ffmpeg-installer/ffmpeg --global

# EXPOSE 9966   # Reminder that canvas-sketch default port is 99
