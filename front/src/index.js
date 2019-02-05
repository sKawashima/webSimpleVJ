import './index.styl'
import ShuffleText from 'shuffle-text'

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
}

ipcRenderer.on('updateMainView', (ev, params) => {
  console.log(params)
  updateViews(params)
})
