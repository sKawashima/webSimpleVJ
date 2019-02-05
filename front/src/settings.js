import './settings.sass'

const ipcRenderer = require('electron').ipcRenderer
const AColorPicker = require('a-color-picker')

const inputTitle = document.getElementById('title')
const inputArtist = document.getElementById('artist')

let r = {}

const sendParam = (title, artist) => {
  // console.log(r)
  ipcRenderer.send('updateParams', r)
}

document.getElementById('sendButton').addEventListener('click', () => {
  r.title = inputTitle.value
  r.artist = inputArtist.value
  sendParam()
})

document.getElementById('clearButton').addEventListener('click', () => {
  r.title = '■■■■■■■■■■'
  r.artist = '■■■■■■■■■■'
  sendParam()
})

AColorPicker.from('.picker')
  .on('change', (p, color) => {
    document.getElementById('app').style.backgroundColor = color
    r.color = color
  })

inputTitle.addEventListener('click', () => {
  inputTitle.select(0, inputTitle.value.length)
})

inputArtist.addEventListener('click', () => {
  inputArtist.select(0, inputArtist.value.length)
})
