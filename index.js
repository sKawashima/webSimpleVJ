'use strict'

const path = require('path')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const dialog = electron.dialog

let mainWindow

let menuTemplate = [{
  label: 'meu',
  submenu: [
    { label: 'About', accelerator: 'CmdOrCtrl+Shift+A', click: () => { showAboutDialog() } },
    { type: 'separator' },
    { label: 'Settings', accelerator: 'CmdOrCtrl+,', click: () => { showSettingWindow() } },
    { type: 'separator' },
    { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => { app.quit() } }
  ]
}]

const showAboutDialog = () => {
  dialog.showMessageBox({
    type: 'info',
    buttons: ['OK'],
    message: 'About',
    detail: 'だって欲しかったんだもん'
  })
}

const showSettingWindow = () => {}

let menu = Menu.buildFromTemplate(menuTemplate)

const createMainWindow = () => {
  Menu.setApplicationMenu(menu)
  mainWindow = new BrowserWindow({ width: 600, height: 400 })
  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createMainWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow == null) {
    createMainWindow()
  }
})
