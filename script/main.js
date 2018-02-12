const {app, BrowserWindow,//窗口部分
       Menu, MenuItem, dialog,//菜单和对话框
       ipcMain}//进程间通信
       = require('electron');
//let safeExit = false;//是否可以安全退出

let mainWindow;
const windowConfig = {
    width: 800,
    height: 600,
};
const createWindow = function(){
    mainWindow = new BrowserWindow(windowConfig);
    //加载主界面
    mainWindow.loadURL(`file://${__dirname}/../index.html`);
    //开启调试工具
    //mainWindow.webContents.openDevTools();
    
    //调整主界面大小时重新加载
    /*mainWindow.on('resize', () => {
        mainWindow.reload();
    })*/

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);//electron完成初始化后触发
app.on('window-all-closed', () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});
app.on('activate', () => {
    if(mainWindow === null){
        createWindow();
    }
});
