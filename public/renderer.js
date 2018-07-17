console.log("load master renderer")

const electron = window.require('electron');
const fs = electron.remote.require('fs');

const ipcMain = electron.ipcMain;
const ipcRenderer = electron.ipcRenderer;


ipcRenderer.on('sample-message-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})





