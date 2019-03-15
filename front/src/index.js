import './index.styl'
import ShuffleText from 'shuffle-text'
import visualizer from 'visualizer.js'

const viz = visualizer({
  parent: '#background'
})
const ipcRenderer = require('electron').ipcRenderer

const changeText = (params) => {
  if (document.getElementById('title').innerHTML !== params.title || document.getElementById('display').style.fontFamily !== params.font) {
    document.getElementById('title').innerHTML = params.title
    const title = new ShuffleText(document.getElementById('title'))
    title.start()
  }
  if (document.getElementById('artist').innerHTML !== params.artist || document.getElementById('display').style.fontFamily !== params.font) {
    document.getElementById('artist').innerHTML = params.artist
    const artist = new ShuffleText(document.getElementById('artist'))
    artist.start()
  }
}

let vizNumber
const updateViews = (params) => {
  if (params.color) {
    document.getElementById('background').style.backgroundColor = params.color
  }
  changeText(params)
  if (params.title === '' && params.artist === '') {
    document.getElementById('display').style.opacity = 0
  } else {
    document.getElementById('display').style.opacity = 1
  }
  if (params.font) {
    document.getElementById('display').style.fontFamily = params.font
  }

  switch (params.visualizer) {
    case 'random':
      while (true) {
        vizNumber = 4
        vizNumber = Math.floor(Math.random() * 7)
        viz.vary()
        if (vizNumber !== 4) break
      }
      break
    case 'normal':
      vizNumber = 0
      break
    case 'ball':
      vizNumber = 1
      break
    case 'ring':
      vizNumber = 2
      break
    case 'bira':
      vizNumber = 3
      break
    case 'tile':
      vizNumber = 5
      break
    case 'speed':
      vizNumber = 6
      break
    default:
      vizNumber = 0
      break
  }
  if (params.visualizer === 'off') {
    document.getElementsByTagName('canvas')[0].style.opacity = 0
  } else {
    document.getElementsByTagName('canvas')[0].style.opacity = 1
  }
  console.log(vizNumber)
  viz.showVisualization(vizNumber)
}

ipcRenderer.on('updateMainView', (ev, params) => {
  console.log(params)
  updateViews(params)
})
