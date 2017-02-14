const gr = require('grimoirejs').default;
const $ = require('jquery');
const { swifter } = require('./easing');

const $$ = gr('#slide');

const editorConfig = [
  {
    id: 'model-editor',
    mode: 'xml',
    text: require('./sample/model.goml.txt'),
  },
];
const editors = require('./editor-settings')(editorConfig);

$('#model-container .left .run').on('click', (this_) => {
  const text = editors[0].getValue();
  const parsed = (new DOMParser).parseFromString(text, 'application/xml').documentElement;
  const scene = parsed.querySelector('scene');
  console.log(scene);
  $$('.model *').forEach((v) => {
    if (v.name.name !== 'camera' && v.name.name !== 'light') {
      v.remove();
    }
  });
  Array.from(scene.childNodes).forEach((node) => {
    if (node.nodeType !== 1) { return; }
    if (node.nodeName === 'camera' || node.nodeName === 'light') { return; }
    $$('.model').append(node.outerHTML);
  });
});

$$('.model').on('show', () => {
});

$$('.model').on('build', (i) => {
  console.log('model', i);
  switch (i) {
    case 1:
      $('#model-container').delay(200).stop(false, true).fadeIn(500, swifter);
      break;
    case 2:
      $('#model-container').stop(false, true).fadeOut(500, swifter)
      $$('.model').single().getComponent('PageScene').operate(1);
      break;
  }
});

$$('.model').on('hide', (i) => {
  $('#model-container').removeAttr('style');
});