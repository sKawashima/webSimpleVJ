import './settings.sass'

const ipcRenderer = require('electron').ipcRenderer
const AColorPicker = require('a-color-picker')
const ID3 = require('id3-parser')
const convertFileToBuffer = require('id3-parser/lib/universal/helpers').convertFileToBuffer

const inputTitle = document.getElementById('title')
const inputArtist = document.getElementById('artist')

let r = {}

const sendParam = (title, artist) => {
  console.log(r)
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

document.ondragover = document.ondrop = (e) => {
  e.preventDefault()
}

document.body.addEventListener('drop', (e) => {
  console.log('file dropped:', e.dataTransfer.files[0].path)
  convertFileToBuffer(e.dataTransfer.files[0])
    .then(ID3.parse)
    .then((tags) => {
      console.log(tags)
      inputTitle.value = tags.title
      inputArtist.value = tags.artist
    })
})

const listViewButton = (array, viewId) => {
  console.log(viewId)
  for (const item of array) {
    console.log(item)
    const button = document.createElement('a')
    button.innerHTML = item
    button.addEventListener('click', () => {
      r[viewId] = item
      const fontbuttons = document.getElementById(viewId).getElementsByTagName('a')
      for (let i = 0; i < fontbuttons.length; i++) {
        fontbuttons[i].classList.remove('active')
      }
      button.classList.add('active')
    })
    document.getElementById(viewId).appendChild(button)
  }
}

// fonts
const fonts = ['serif', 'sans-serif']
listViewButton(fonts, 'font')

// visualizer
const visualizer = ['random', 'normal', 'ball', 'ring', 'bira', 'tile', 'speed', 'off']
listViewButton(visualizer, 'visualizer')
