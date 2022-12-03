/*
Copyright 2022 GregVido
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const electron = require('electron');
const { PARAMS, VALUE, MicaBrowserWindow } = require('mica-electron');
const path = require('path');
const fs = require('fs');

const FOLDER_CONFIG = path.join(process.env.APPDATA, 'MicaSnap');
const FILE_CONFIG = path.join(process.env.APPDATA, 'MicaSnap') + "/config.json";

if (!fs.existsSync(FOLDER_CONFIG))
    fs.mkdirSync(FOLDER_CONFIG);

if (!fs.existsSync(FILE_CONFIG))
    fs.writeFileSync(FILE_CONFIG, JSON.stringify({ background: PARAMS.BACKGROUND.MICA }, null, 4));

let SETTING = require(FILE_CONFIG);

let ipcMain = electron.ipcMain;

electron.app.commandLine.appendSwitch("enable-transparent-visuals");

electron.app.on('ready', () => {
    let background = SETTING.background;
    let theme = VALUE.THEME.AUTO;

    const win = new MicaBrowserWindow({
        width: 1280,
        height: 720,
        effect: background,
        theme: VALUE.THEME.AUTO,
        autoHideMenuBar: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: path.join('icon', 'app.ico')
    });

    if(!SETTING.bounds) {
        SETTING.bounds = win.getBounds();
        fs.writeFileSync(FILE_CONFIG, JSON.stringify(SETTING, null, 4));
    }
    else 
        win.setBounds(SETTING.bounds);

    win.loadURL('https://web.snapchat.com/', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.62'
    });

    win.webContents.on('dom-ready', () => {
        let injector = fs.readFileSync(path.join(__dirname, 'injector', 'index.js')).toString();
        injector = injector.replace('CSS_CONTENT', '`' + fs.readFileSync(path.join(__dirname, 'injector', 'styles.css')).toString() + '`');
        win.webContents.executeJavaScript(injector);

        win.show();
    });

    win.on('close', () => {
        SETTING.bounds = win.getBounds();
        fs.writeFileSync(FILE_CONFIG, JSON.stringify(SETTING, null, 4));
    });

    ipcMain.on('getBackground', (event) => {
        event.returnValue = background
    });

    ipcMain.on('theme', (event, id) => {
        const webContents = event.sender;
        const win = MicaBrowserWindow.fromWebContents(webContents);

        if (id == 0)
            theme = VALUE.THEME.LIGHT;
        else if (id == 1)
            theme = VALUE.THEME.DARK;

        win.setVisualEffect(background, theme);
    });

    ipcMain.on('effect', (event, id) => {
        const webContents = event.sender;
        const win = MicaBrowserWindow.fromWebContents(webContents);

        background = id;
        win.setVisualEffect(background, theme);

        SETTING.background = id;
        fs.writeFileSync(FILE_CONFIG, JSON.stringify(SETTING, null, 4));
    });
});