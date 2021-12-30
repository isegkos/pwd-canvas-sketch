# pwd-canvas-sketch
This is a simple docker solution to experiment with canvas-sketch in PWD (Play With Docker) without installing node.js and canvas-sketch locally.

First, go to play with docker lab and start a new session:
- https://labs.play-with-docker.com/

Add a new instance and run the following command on the command prompt:
- git clone https://github.com/isegkos/pwd-canvas-sketch.git
- mkdir src
- docker-compose build
- docker-compose run --rm -p 8888:9966 node sh

You will get an environment where you can run canva-sketch commands, like:
- canvas-sketch sketch.js --new (to create a new sketch)
- canvas-sketch sketch.js (to open an existing sketch)

If you type exit and press ENTER you will leave the environment. If you want to start the environment again run the following command again:
- docker-compose run --rm -p 8888:9966 node sh

Your sketches are located in the src directory. To edit your sketches in the online editor:
- click on [EDITOR]

To view your sketches in the browser:
- click on [OPEN PORT]
- enter 8888




