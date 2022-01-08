const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const load = require('load-asset');
const Tweakpane = require('tweakpane');

let manager;

// const initialURL = 'https://uploads0.wikiart.org/images/nikolaos-lytras/portrait-of-the-painter-s-mother.jpg';
const initialURL = 'https://upload.wikimedia.org/wikipedia/commons/8/84/Nikolaos_Lytras_selfportrait.jpeg';
const imgCanvas = document.createElement('canvas');
const imgContext = imgCanvas.getContext('2d');
let image;
let data;
let cell = {};
let pane;

const PARAMS = {
  imgURL: initialURL,
  imgHeight: 400,
  imgWidth: 400,
	cellWidth: 10,
	cellHeight: 10,
	scaleFont: 1,
  background: '#111',
  text: 'ゴッドハンド',
  direction: 'Organic',
	// freq: 0.01,
	// frameFactor: true,
  showOriginal: false,
  fps:2
}

const settings = {
  dimensions: [ 1080, 1080 ],
  playbackRate: "throttle",
  animate: true,
  fps: 2
};

const updateURL = (imgURL) => {
  load({url:imgURL, type:'image', crossOrigin: 'Anonymous'})
  .then( img => {image = img;})
  .then( () => updateCell())
  .then( () => manager.update({dimensions: [image.width, image.height]}))
  .catch( e => console.log(e));
}

const updateCell = () => {
  cell.w = PARAMS.cellWidth;
  cell.h = PARAMS.cellHeight;
  PARAMS.imgWidth = image.width;
  PARAMS.imgHeight = image.height;
  pane.refresh();
  cell.wcount = Math.floor(image.width / cell.w);
  cell.hcount = Math.floor(image.height / cell.h);
  cell.count = cell.wcount * cell.hcount;
  imgContext.drawImage(image, 0, 0, cell.wcount, cell.hcount);
  data = imgContext.getImageData(0, 0, cell.wcount, cell.hcount).data;
}

const sketch = async ({context, update}) => {
  image = await load({url:initialURL, type:'image', crossOrigin: 'Anonymous'});
  cell.w = PARAMS.cellWidth;
  cell.h = PARAMS.cellHeight;
  cell.wcount = Math.floor(image.width / cell.w);
  cell.hcount = Math.floor(image.height / cell.h);
  cell.count = cell.wcount * cell.hcount;
  imgContext.drawImage(image, 0, 0, cell.wcount, cell.hcount);
  data = imgContext.getImageData(0, 0, cell.wcount, cell.hcount).data;

  update({dimensions: [image.width, image.height]});

  return ({ context, width, height, frame }) => {
    if (PARAMS.showOriginal) {
      context.drawImage(image, 0, 0, image.width, image.height);
      return;
    }
    context.fillStyle = PARAMS.background;
		context.fillRect(0, 0, width, height);
    context.font = `italic bold ${(cell.w > cell.h? cell.w : cell.h) * PARAMS.scaleFont}px arial`;
		context.textBaseline = 'middle';
		context.textAlign = 'center';
    const chars = PARAMS.text.split('');

    for (let i = 0; i < cell.count; i++) {
      const r = data[i * 4 + 0];
      const g = data[i * 4 + 1];
      const b = data[i * 4 + 2];
      const a = data[i * 4 + 3];
      const color = `rgb(${r},${g},${b})`;

      const col = i % cell.wcount;
			const row = Math.floor(i / cell.wcount);
			const x = col * cell.w;
			const y = row * cell.h;

      // const frameFactor = PARAMS.frameFactor ? 100 : 0;
      // const n = random.noise3D(x, y, frame * frameFactor, PARAMS.freq);
      const n = random.noise3D(x, y, frame * 10, PARAMS.freq);

      context.save();
      context.translate(x,y);
      context.translate(cell.w / 2, cell.h / 2);
      context.beginPath();
      context.rect(0, 0, cell.w, cell.h);
      context.fillStyle = color;
      const index = Math.floor(math.mapRange(n, -1, 1, 0, chars.length-1));
      context.fillText(chars[index], 0, 0);
      context.restore();
    }

  };
}

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();

const createPane = () => {
	pane = new Tweakpane.Pane();
	let folder;
  let button;

	folder = pane.addFolder({ title: 'Image '});
  folder.addInput(PARAMS, 'imgURL').on('change', (ev) => {
    if (ev.last) {
      console.log(ev.value);
      updateURL(ev.value);
    }
  });
  folder.addSeparator();
  button = folder.addButton({title: 'Load Random'});
  folder.addInput(PARAMS, 'imgHeight');
  folder.addInput(PARAMS, 'imgWidth');
  button.on('click', () => {
    PARAMS.imgURL = `https://picsum.photos/${PARAMS.imgWidth}/${PARAMS.imgHeight}?i=${Date.now()}`;
    updateURL(PARAMS.imgURL);
  });
  folder.addSeparator();
  folder.addInput(PARAMS, 'showOriginal').on('change', (ev) => {
      manager.render();
  });


	folder = pane.addFolder({ title: 'Cell '});
	folder.addInput(PARAMS, 'cellWidth', { min: 2, max: 40, step: 2 });
	folder.addInput(PARAMS, 'cellHeight', { min: 2, max: 40, step: 2 });
  folder.on('change', (ev) => {
    if (ev.last) {
      updateCell();
    }
  });

	folder = pane.addFolder({ title: 'Font Size / Background' });
	folder.addInput(PARAMS, 'scaleFont', { min: 1, max: 10, step: 0.5 });
	folder.addInput(PARAMS, 'background');
  folder.on('change', (ev) => {
    if (ev.last) {
      manager.render();
    }
  });
  folder = pane.addFolder({ title: 'Text' });
  folder.addInput(PARAMS, 'text');

	folder = pane.addFolder({ title: 'Animate'});
  button = folder.addButton({title: 'Pause'});
  button.on('click', () => {
    manager.pause();
  });
  button = folder.addButton({title: 'Play'});
  button.on('click', () => {
    manager.play();
  });
	folder.addInput(PARAMS, 'fps', { min: 2, max: 30, step: 2 }).on('change', (ev) => {
    manager.update({fps:ev.value});
  });;

  pane.on('change', (ev) => {
    if (ev.last) {
      manager.render();
    }
  });
  
};

createPane();
