var blessed = require('blessed');
 
// Create a screen object. 
var screen = blessed.screen({
  smartCSR: true
});
 
screen.title = 'Baz\'s Brew Transport';
 
// Create a box perfectly centered horizontally and vertically. 
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '75%',
  height: '75%',
  content: '{center}Container Temperature{/center}',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: '#f0f0f0'
    },
  }
});
 
var table = blessed.table({
  top: 2,
  left: 'center',
  parent:box,
  tags: true,
  data:[
    [ '1: ' , '2: ' ],
    [ '3: ' , '4: ' ],
    [ '5: ' , '6: ' ]
  ],
  noCellBorders:false,
  style:{
    cell:{
      fg: 'white',
      border: {
        fg: '#f0f0f0'
      }
    },
    header:{
      fg: 'white',
      border: {
        fg: '#f0f0f0'
      }
    }
  } 
});

var exitMsg = blessed.text({
  bottom:1,
  right:1,
  content:'Press Escape to Quit'
})
// Append our box to the screen. 
screen.append(box);
screen.append(exitMsg);
 
// Quit on Escape, q, or Control-C. 
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});
 
screen.render();

module.exports = {
  screen,
  table
};