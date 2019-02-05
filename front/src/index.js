import './index.styl'

const ipcRenderer = require('electron').ipcRenderer

const updateViews = (params) => {
  if (params.color) {
    document.getElementById('background').style.backgroundColor = params.color
  }
  document.getElementById('title').innerHTML = params.title
  document.getElementById('artist').innerHTML = params.artist
}

ipcRenderer.on('updateMainView', (ev, params) => {
  console.log(params)
  updateViews(params)
})
