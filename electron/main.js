const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('path')

let mainWindow = null
let childWindow = null

// ======================= 创建主窗口 =======================
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1500,
        height: 1200,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true
        }
    })

    const isDev = !app.isPackaged

    // 主窗口加载页面
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173')
    } else {
        mainWindow.loadFile(path.join(__dirname, '../renderer/dist/index.html'))
    }
}

// ======================= 创建子窗口 =======================
function openChildWindow() {
    if (childWindow) return childWindow.focus();

    childWindow = new BrowserWindow({
        width: 420,
        height: 350,
        title: "登录",
        parent: mainWindow,
        modal: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true
        }
    });

    const isDev = !app.isPackaged;

    if (isDev) {
        childWindow.loadURL('http://localhost:5173/#/login');
    } else {
        childWindow.loadFile(
            path.join(__dirname, '../renderer/dist/index.html'),
            { hash: 'login' }
        );
    }

    childWindow.on("closed", () => (childWindow = null));
}


// ======================= App Ready =======================
app.whenReady().then(() => {

    createWindow()

    const template = [
        { label: '客户管理' },
        { label: '算账设置' },
        { label: '封盘设置' },
        { label: '回水工具' },
        { label: '关于' },

        {
            label: '已连框架',
            click() {
                openChildWindow()     // ← 正确位置
            }
        },

        { label: '上下分窗' },
        { label: '查看账号信息' },
        { label: 'F10隐藏显示窗口' }
    ]

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
})

// ======================= IPC 通信 =======================
ipcMain.handle('login-attempt', async (_, payload) => {
    console.log('login-attempt payload:', payload);

    if (payload.account === 'admin' && payload.password === '123') {
        mainWindow.webContents.send('login-success', {
            uid: payload.account
        });
        return { ok: true, message: '登录成功' };
    } else {
        return { ok: false, message: '账号或密码错误' };
    }
});

ipcMain.handle('manual-draw', async () => {
    const a = Math.floor(Math.random() * 10)
    const b = Math.floor(Math.random() * 10)
    const c = Math.floor(Math.random() * 10)
    return { a, b, c }
})

ipcMain.handle('start-draw', async (_, payload) => ({ ok: true, payload }))
ipcMain.handle('stop-draw', async () => ({ ok: true }))

// ======================= 关闭处理 =======================
app.on('window-all-closed', () => {
    app.quit()
})
