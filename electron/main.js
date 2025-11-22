const { app, BrowserWindow, ipcMain, Menu,globalShortcut } = require('electron')
const path = require('path')

let mainWindow = null
let frameWindow = null
let loginWindow = null

// ======================= 创建主窗口 =======================
function createWindow() {       //一级窗口
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
    mainWindow.webContents.openDevTools({ mode: 'right' })
}
// ======================= 二级窗口（框架窗口） =======================
function openFrameWindow() {
    if (frameWindow) {
        frameWindow.focus()
        return
    }

    frameWindow = new BrowserWindow({
        width: 850,
        height: 600,
        title: "框架信息",
        parent: mainWindow,
        modal: false,
        resizable: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true
        }
    })
    frameWindow.setMenu(null)
    const isDev = !app.isPackaged
    if (isDev)
        frameWindow.loadURL("http://localhost:5173/#/frame")
    else
        frameWindow.loadFile(path.join(__dirname, "../renderer/dist/index.html"), { hash: "frame" })

    frameWindow.on("closed", () => frameWindow = null)
}

// ======================= 三级窗口（登录窗口） =======================
function openLoginWindow() {
    if (loginWindow) {
        loginWindow.focus()
        return
    }
    loginWindow = new BrowserWindow({
        width: 420,
        height: 360,
        title: "登录",
        parent: frameWindow,   // 三级窗口挂在二级窗口下面
        modal: false,
        resizable: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true
        }
    })
    loginWindow.setMenu(null)
    const isDev = !app.isPackaged

    if (isDev)
        loginWindow.loadURL("http://localhost:5173/#/login")
    else
        loginWindow.loadFile(path.join(__dirname, "../renderer/dist/index.html"), { hash: "login" })

    loginWindow.on("closed", () => loginWindow = null)
}


// ======================= App Ready =======================
app.whenReady().then(() => {
    createWindow()
    // ---------------- 注册 F10 隐藏 / 显示 主窗口 ----------------
    globalShortcut.register('F10', () => {
        toggleAllWindows()
    })
    const template = [
        { label: '客户管理',
            click() {
                mainWindow.webContents.send('router-navigate', '/')
            }
            },
        { label: '算账设置',
            click() {
                mainWindow.webContents.send('router-navigate', '/setting')
            }
        },
        { label: '封盘设置' },
        { label: '回水工具' },
        { label: '关于' },
        {
            label: '已连框架',
            click() {
                openFrameWindow()     // ← 正确位置
            }
        },
        { label: '上下分窗' },
        { label: '查看账号信息' },
        { label: 'F10隐藏显示窗口',
            click() {
                toggleAllWindows()
            }
        }
    ]
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
})
function toggleAllWindows() {
    const wins = [mainWindow, frameWindow, loginWindow].filter(w => w && !w.isDestroyed())
    if (wins.length === 0) return
    // 判断当前状态 → 如果有任何一个窗口是可见的，就全部隐藏
    const anyVisible = wins.some(win => win.isVisible())
    if (anyVisible) {
        wins.forEach(win => win.hide())
    } else {
        // 全部窗口恢复显示
        wins.forEach(win => win.show())
    }
}

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
ipcMain.on('setting-bill', (_, page) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('router-navigate', page)
    }
});
ipcMain.handle('start-draw', async (_, payload) => ({ ok: true, payload }))
ipcMain.handle('stop-draw', async () => ({ ok: true }))
ipcMain.on("frame-open-login", () => {
    openLoginWindow();
});
// ======================= 关闭处理 =======================
app.on('window-all-closed', () => {
    app.quit()
})
app.on('will-quit', () => {
    globalShortcut.unregisterAll()
})
