const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const {MenuTemplate, addMenuItems} = require('./menu-template.js')

let main_window;
const window_config = {
    width: 800,
    height: 600,
    frame: false,
    titleBarStyle: 'hiddenInset',
    transparent: true,
    //darkTheme: true
    //opacity: 0.5
};
const createWindow = function() {
    main_window = new BrowserWindow(window_config);
    //加载主界面
    main_window.loadURL(`file://${__dirname}/../index.html`);
    //开启调试工具
    main_window.webContents.openDevTools();

    main_window.on('closed', () => {
        main_window = null;
    });
};

const createMenu = function() {
    const menu = Menu.buildFromTemplate(MenuTemplate);
    addMenuItems(main_window, menu);
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
    if(main_window === null){
        createWindow();
    }
});

const resizeWindow = function(event, size) {
    main_window.setAspectRatio(size.width / size.height);//设定窗口定宽高比
    main_window.setSize(size.width, size.height);
};
ipcMain.on('resize', resizeWindow);