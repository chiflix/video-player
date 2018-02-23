const {shell, MenuItem} = require('electron');

const MenuTemplate = [
    {
        label: 'File',
        submenu: [
            //EMPTY
        ]
    },
    {
        label: 'View',
        submenu: [
            {role: 'reload'},
            {type: 'separator'},
            {role: 'togglefullscreen'}
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Home Page',
                click() { 
                    shell.openExternal('https://www.google.com/ncr'); 
                }
            }
        ]
    }
];

function addMenuItems(currentWindow, menu) {
    //新建打开文件的菜单项
    menu.items[0].submenu.append(new MenuItem({
        label: 'Open',
        click(){
            currentWindow.webContents.send('action', 'open'); 
        },
        accelerator: 'CmdOrCtrl+O'
    }));
    menu.items[0].submenu.append(new MenuItem({
        type: 'separator'
    }));
    menu.items[0].submenu.append(new MenuItem({
        role: 'quit'
    }));
}

module.exports.MenuTemplate = MenuTemplate;
module.exports.addMenuItems = addMenuItems;