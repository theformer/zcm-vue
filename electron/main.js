const { app, BrowserWindow, ipcMain,Menu } = require('electron');
const path = require('path');

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500, height: 1200,
    webPreferences: { preload: path.join(__dirname,'preload.js'), contextIsolation: true }
  });
  mainWindow.loadURL('http://localhost:5173');
}
app.whenReady().then(createWindow);
app.on('window-all-closed', ()=>{ if(process.platform !== 'darwin') app.quit(); });

// 在 Electron 启动时调用
app.on('ready', () => {
    createWindow()

    // 自定义菜单
    const template = [
        {
            label: '客户管理',
        },
        {
            label: '算账设置',
        },
        {
            label: '封盘设置',
        },
        {
            label: '回水工具',
        },
        {
            label: '关于',
        },
        // =================== 右侧菜单 ======================
        {
            label: '已连框架',
            submenu: [
                { label: '开启提醒', click() {} },
                { label: '关闭提醒', click() {} }
            ]
        },
        {
            label: '上下分窗',
            submenu: [
                { label: '开启提醒', click() {} },
                { label: '关闭提醒', click() {} }
            ]
        },
        {
            label: '查看账号信息',
            submenu: [
                { label: '开启提醒', click() {} },
                { label: '关闭提醒', click() {} }
            ]
        },
        {
            label: 'F10隐藏显示窗口',
            submenu: [
                { label: '开启提醒', click() {} },
                { label: '关闭提醒', click() {} }
            ]
        }
    ]

    // 创建菜单
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})


ipcMain.handle('manual-draw', async () => {
  const a = Math.floor(Math.random()*10), b = Math.floor(Math.random()*10), c = Math.floor(Math.random()*10);
  return {a,b,c};
});
ipcMain.handle('start-draw', async (_,payload)=> ({ok:true, payload}));
ipcMain.handle('stop-draw', async ()=> ({ok:true}));
