const { app, BrowserWindow, ipcMain, shell } = require('electron')
const electronReload = require('electron-reload')(__dirname)
const pjson = require('./package.json')
const path = require('path')
const os = require('os')

// Squirrel
const windowsInstaller = require('./build/WindowsInstaller')
if (windowsInstaller.handleSquirrelEvent()) {
    return
}

// Environment Setting
process.env.NODE_ENV = 'development'

// Environment Variables
const devMode = process.env.NODE_ENV !== 'production' ? true : false
const macOS = process.env.NODE_ENV === 'darwin' ? true : false

// Application Window
let window
function createWindow() {
    window = new BrowserWindow({
        title: `Application v${pjson.version}`,
        width: devMode ? 500 : 500,
        height: 500,
        resizable: devMode,
        autoHideMenuBar: !devMode,
        icon: `${__dirname}/assets/Icon.png`,
        backgroundColor: '#232323',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    })
    window.loadFile('app/index.html')
}

// Instantiate Application Window
app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// Close Application Window
app.on('window-all-closed', () => {
    if (!macOS) {
        app.quit()
    }
})