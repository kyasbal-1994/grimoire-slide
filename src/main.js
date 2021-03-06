const gr = require('grimoirejs').default;
const {MaterialFactory} = require('grimoirejs-fundamental').default.Material;
const SlideManager = require('./components/slide-manager');
const SlideRenderer = require('./components/slide-renderer');
const SlideRenderScene = require('./components/slide-render-scene');
const PageScene = require('./components/page-scene');
const Rotate = require('./components/rotate')

const slideShader = require('./transition/slide.sort');
const pushShader = require('./transition/push.sort');
const glitchShader = require('./transition/glitch.sort');
const noiseShader = require('./transition/noise.sort');
const revealShader = require('./transition/reveal.sort');
const blackShader = require('./transition/black.sort');

gr.register(async () => {
  MaterialFactory.addSORTMaterial('transition-slide', slideShader);
  MaterialFactory.addSORTMaterial('transition-push', pushShader);
  MaterialFactory.addSORTMaterial('transition-glitch', glitchShader);
  MaterialFactory.addSORTMaterial('transition-noise', noiseShader);
  MaterialFactory.addSORTMaterial('transition-reveal', revealShader);
  MaterialFactory.addSORTMaterial('transition-black', blackShader);
  gr.registerComponent('SlideManager', SlideManager);
  gr.registerComponent('SlideRenderScene', SlideRenderScene);
  gr.registerComponent('SlideRenderer', SlideRenderer);
  gr.registerComponent('PageScene', PageScene);
  gr.overrideDeclaration('renderer', ['SlideRenderer']);
  gr.overrideDeclaration('goml', ['SlideManager']);
  gr.registerNode('page', ['PageScene'], {}, 'scene');
  gr.registerNode('slide-render-scene', ['MaterialContainer', 'SlideRenderScene'], {});
  gr.overrideDeclaration('mesh', [], { specularRatio: 0 });
  require('./components/webcam');
  gr.registerNode('kurukuru-mesh', ['Rotate'], {}, 'mesh');
});
