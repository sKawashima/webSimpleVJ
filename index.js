'use strict'

const path = require('path')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const dialog = electron.dialog
const ipcMain = electron.ipcMain

let mainWindow
let settingsWindow

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
    detail: '超シンプルにVJしたかった'
  })
}

const showSettingWindow = () => {
  settingsWindow = new BrowserWindow({ width: 550, height: 750, resizable: false })
  settingsWindow.loadURL(path.join('file://', __dirname, '/front/settings.html'))
  settingsWindow.webContents.openDevTools()
  settingsWindow.on('closed', () => {
    settingsWindow = null
  })
}

let menu = Menu.buildFromTemplate(menuTemplate)

const createMainWindow = () => {
  Menu.setApplicationMenu(menu)
  mainWindow = new BrowserWindow({ width: 1280, height: 720 })
  mainWindow.loadURL(path.join('file://', __dirname, '/front/index.html'))
  mainWindow.webContents.openDevTools()
  updateMainView()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  showSettingWindow()
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

let viewParams = {
  title: 'data1',
  artist: 'data2',
  color: '#6F3381'
}

const updateMainView = () => {
  mainWindow.webContents.send('updateMainView', viewParams)
}

ipcMain.on('updateParams', (ev, params) => {
  Object.assign(viewParams, params)
  updateMainView()
})
