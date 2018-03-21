const {
    app,
    globalShortcut,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron');
const {MenuTemplate, addMenuItems} = require('./menu-template.js')
const MIN_WIDTH = 320;
const MIN_HEIGHT = 320;

let main_window;

let current_window_width = 800;
let current_window_height = 600;

const window_config = {
    width: current_window_width,
    height: current_window_height,
    frame: false,
    titleBarStyle: 'customButtonsOnHover',
    transparent: true
    // darkTheme: true
    //opacity: 0.5
};
const createWindow = function() {
    main_window = new BrowserWindow(window_config);
    //加载主界面
    main_window.loadURL(`file://${__dirname}/../index.html`);
    //开启调试工具
    // main_window.webContents.openDevTools();

    //设定窗口最小尺寸
    main_window.setMinimumSize(MIN_WIDTH, MIN_HEIGHT);

    main_window.on('closed', () => {
        main_window = null;
    });

    main_window.on('resize',() => {
        main_window.setAspectRatio(current_window_width/current_window_height);
    });
};

const createMenu = function() {
    const menu = Menu.buildFromTemplate(MenuTemplate);
    addMenuItems(main_window, menu);
    Menu.setApplicationMenu(menu);
};

const registerShortcut = function(){
    globalShortcut.register('CommandOrControl+W', () => {
        if(main_window)
            main_window.close();
    })
}

const initializeApp = function() {
    createWindow();
    createMenu();
    registerShortcut();
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
    current_window_width = size.width;
    current_window_height = size.height;
    main_window.setSize(size.width, size.height);
};

ipcMain.on('resetWindowSize', resizeWindow);

const toggleFullScreenState = function() {
    if(main_window.isFullScreen()) {
        main_window.setFullScreen(false);
    } else {
        main_window.setFullScreen(true);
    }
};

ipcMain.on('toggleFullScreenState', toggleFullScreenState);
