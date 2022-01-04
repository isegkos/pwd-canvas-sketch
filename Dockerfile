FROM node:alpine

WORKDIR /home/node/app
RUN npm install canvas-sketch-cli -g
RUN npm install canvas-sketch-util --save
RUN npm install @ffmpeg-installer/ffmpeg --global
RUN npm install --save tweakpane
RUN npm install load-asset --save

# EXPOSE 9966   # Reminder that canvas-sketch default port is 99
