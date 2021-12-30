# pwd-canvas-sketch
This is a simple docker solution to experiment with canvas-sketch online in PWD (Play With Docker) Lab without installing node.js and canvas-sketch locally. Every session is kept alive for 4 hours, after that everything is deleted. If you want to save something copy/download before the end of the session. You can then upload in a new session by simply drag & drop in the PWD window.

First, go to PWD Lab select [Start] to start a new session:
- https://labs.play-with-docker.com/

Select [+ADD NEW INSTANCE] and run the following commands on the command prompt (you can copy and then paste in the command line with the mouse middle button):
- git clone https://github.com/isegkos/pwd-canvas-sketch.git
- cd pwd-canvas-sketch
- mkdir app
- docker-compose build
- docker-compose run --rm -p 8888:9966 node sh

You will get an environment where you can run canva-sketch commands, like:
- canvas-sketch sketch.js --new (to create a new sketch)
- canvas-sketch sketch.js (to open an existing sketch)

Whenever you want to stop working on a sketch and start/open another sketch, press CTRL+C and give the next canvas-sketch command. 

If you type exit and press ENTER you will leave the environment. If you want to start the environment again in the same PWD instance/session, run the following command again:
- docker-compose run --rm -p 8888:9966 node sh

Your sketches are located in the pwd-canvas-sketch/app directory. To edit your sketches in the online editor:
- click on [EDITOR]

To view your sketches in the browser:
- click on [OPEN PORT]
- enter 8888

or 
- click on the [8888] link if it becomes visible

![Screen shot: PWD & Editor](Screenshot%201.png)
![Screen shot: Sketch & Editor](Screenshot%202.png)

