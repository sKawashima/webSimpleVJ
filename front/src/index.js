import './index.styl'
import ShuffleText from 'shuffle-text'
import visualizer from 'visualizer.js'

const viz = visualizer({
  parent: '#background'
})
const ipcRenderer = require('electron').ipcRenderer

const changeText = (params) => {
  document.getElementById('title').innerHTML = params.title
  const title = new ShuffleText(document.getElementById('title'))
  title.start()
  document.getElementById('artist').innerHTML = params.artist
  const artist = new ShuffleText(document.getElementById('artist'))
  artist.start()
}

const updateViews = (params) => {
  if (params.color) {
    document.getElementById('background').style.backgroundColor = params.color
  }
  changeText(params)

  let vizNumber = Math.floor(Math.random() * 7)
  while (vizNumber === 4) {
    vizNumber = Math.floor(Math.random() * 7)
    viz.vary()
  }
  console.log(vizNumber)
  viz.showVisualization(vizNumber)
}

ipcRenderer.on('updateMainView', (ev, params) => {
  console.log(params)
  updateViews(params)
})
