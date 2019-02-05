import './settings.sass'

const ipcRenderer = require('electron').ipcRenderer
const AColorPicker = require('a-color-picker')

let r = {}

const sendParam = (title, artist) => {
  console.log(r)
  ipcRenderer.send('updateParams', r)
}

document.getElementById('sendButton').addEventListener('click', () => {
  r.title = document.getElementById('title').value
  r.artist = document.getElementById('artist').value
  sendParam()
})

document.getElementById('clearButton').addEventListener('click', () => {
  sendParam('■■■■■■■■■■', '■■■■■■■■■■')
})

AColorPicker.from('.picker')
  .on('change', (p, color) => {
    document.getElementById('app').style.backgroundColor = color
    r.color = color
  })
