FROM node:alpine
ENV NODE_ENV=production

WORKDIR /home/node/app
RUN npm install canvas-sketch-cli --global
RUN npm install @ffmpeg-installer/ffmpeg --global
RUN npm install canvas-sketch-util --save
RUN npm install tweakpane --save 
RUN npm install load-asset --save
RUN npm install jimp --save 

EXPOSE 9966 
# RUN chown -R node /home/node/app
# USER node
# CMD ["canvas-sketch", "-p 3000", "sketch.js"]
