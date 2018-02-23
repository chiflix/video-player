const {app, BrowserWindow, Menu} = require('electron');
const {MenuTemplate, addMenuItems} = require('./menu.js')

let mainWindow;
const windowConfig = {
    width: 800,
    height: 600,
};
const createWindow = function() {
    mainWindow = new BrowserWindow(windowConfig);
    //加载主界面
    mainWindow.loadURL(`file://${__dirname}/../index.html`);
    //开启调试工具
    mainWindow.webContents.openDevTools();
    
    //调整主界面大小时重新加载
    mainWindow.on('resize', () => {
        mainWindow.webContents.send('action', 'resize');
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

const createMenu = function() {
    const menu = Menu.buildFromTemplate(MenuTemplate);
    addMenuItems(mainWindow, menu);
    Menu.setApplicationMenu(menu);
};

const initializeApp = function() {
    createWindow();
    createMenu();
};

app.on('ready', initializeApp);//electron完成初始化后触发
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});
app.on('activate', () => {
    if(mainWindow === null){
        createWindow();
    }
});