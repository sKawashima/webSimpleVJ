import './settings.sass'

const ipcRenderer = require('electron').ipcRenderer

const sendParam = (title, artist) => {
  const r = {
    title: title,
    artist: artist
  }
  console.log(r)
  ipcRenderer.send('updateParams', r)
}

document.getElementById('sendButton').addEventListener('click', () => {
  sendParam(document.getElementById('title').value, document.getElementById('artist').value)
})

document.getElementById('clearButton').addEventListener('click', () => {
  sendParam('■■■■■■■■■■', '■■■■■■■■■■')
})
