const electron = require('electron');

// Module to control application life.
const app = electron.app;
const Menu = electron.Menu;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

const {
  ipcMain
} = require('electron')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


ipcMain.on('sample-message', (event, arg) => {
  //console.log(arg) // prints "ping"
  event.sender.send('sample-message-reply', arg)
})





function createWindow() {
  // Create the browser window.

  var path = require("path");
  var fs = require("fs");
  var initPath = path.join(app.getAppPath(), "init.json");
  var data;
  try {
    data = JSON.parse(fs.readFileSync(initPath, 'utf8'));
  } catch (e) {
    //Handle error
  }
  if(!data) {

    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      backgroundColor: "#fff",
      titleBarStyle: 'hidden'
    });
  } else {
    mainWindow = new BrowserWindow(data.bounds);
  }
  

  // and load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  //TODO: factor out event listeners into an array?

  // Create the Application's main menu
  var template = [{
      label: "Application",
      submenu: [{
          label: "About Application",
          selector: "orderFrontStandardAboutPanel:"
        },
        {
          type: "separator"
        },
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: function () {
            app.quit();
          }
        }
      ]
    }, {
      label: "Edit",
      submenu: [{
          label: "Undo",
          accelerator: "CmdOrCtrl+Z",
          selector: "undo:"
        },
        {
          label: "Redo",
          accelerator: "Shift+CmdOrCtrl+Z",
          selector: "redo:"
        },
        {
          type: "separator"
        },
        {
          label: "Cut",
          accelerator: "CmdOrCtrl+X",
          selector: "cut:"
        },
        {
          label: "Copy",
          accelerator: "CmdOrCtrl+C",
          selector: "copy:"
        },
        {
          label: "Paste",
          accelerator: "CmdOrCtrl+V",
          selector: "paste:"
        },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:"
        }
      ]
    },
    {
      label: "Bots",
      submenu: [{
          label: "Stop All",
          accelerator: "Shift+CmdOrCtrl+S",
          click: function () {
            //TODO: stop all bots
          }
        },
        {
          type: "separator"
        }
      ]
    },
    {
      label: "Help",
      submenu: [{
        label: "Website",
        accelerator: "CmdOrCtrl+H",
        selector: ""
      }]
    },

  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  mainWindow.on('moved', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    var data = {
      bounds: mainWindow.getBounds()
    };

    data.bounds.backgroundColor = "#fff";
    data.bounds.titleBarStyle = 'hidden';

    console.log(data);

    fs.writeFileSync(initPath, JSON.stringify(data));



  })

  mainWindow.on('resize', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    var data = {
      bounds: mainWindow.getBounds()
    };

    data.bounds.backgroundColor = "#fff";
    data.bounds.titleBarStyle = 'hidden';

    console.log(data);

    fs.writeFileSync(initPath, JSON.stringify(data));



  })
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.

    mainWindow = null

    listeners.forEach(function (listener) {
      ipcMain.removeListener(listener, (event, arg) => {
        console.log(arg) // prints "ping"

      })
    });
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.