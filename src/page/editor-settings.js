const $ = require('jquery');
const ace = require('brace');
require('brace/mode/javascript');
require('brace/mode/xml');
require('brace/mode/html');

const stopPropagationKey = ['ArrowRight', 'ArrowLeft'];

module.exports = (editorConfig) => {
  editorConfig.forEach((v) => {
    $(`#${v.id}`).on('keyup', (e) => {
      if (stopPropagationKey.includes(e.key)) {
        e.stopPropagation();
      }
    });
  });
  const editors = editorConfig.map((v) => ace.edit(v.id));
  editors.forEach((editor, i) => {
    editor.getSession().setMode(`ace/mode/${editorConfig[i].mode}`);
    // editor.renderer.setShowGutter(false);
    editor.setValue(editorConfig[i].text);
    editor.clearSelection();
    editor.setOptions({
      fontSize: editorConfig[i].fontSize || '4vh',
    });
    editor.session.setOptions({
      tabSize: 2,
      useSoftTabs: true,
    });
  });
  return editors;
};
