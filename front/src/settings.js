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

// fonts
const fonts = ['serif', 'sans-serif']

for (const font of fonts) {
  console.log(font)
  const button = document.createElement('a')
  button.innerHTML = font
  button.addEventListener('click', () => {
    r.font = font
    const fontbuttons = document.getElementById('font').getElementsByTagName('a')
    for (let i = 0; i < fontbuttons.length; i++) {
      fontbuttons[i].classList.remove('active')
    }
    button.classList.add('active')
  })
  document.getElementById('font').appendChild(button)
}
