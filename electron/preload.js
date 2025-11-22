const { contextBridge, ipcRenderer } = require('electron');
console.log('[preload] preload.js running')
contextBridge.exposeInMainWorld('electronAPI', {
    // 登录
    login: (payload) => ipcRenderer.invoke('login-attempt', payload),
    settingBill: (page) => ipcRenderer.send('setting-bill', page),

    // 主窗口监听登录成功
    onLoginSuccess: (cb) => {
        const listener = (e, data) => cb(data)
        ipcRenderer.on('login-success', listener)
        return () => ipcRenderer.removeListener('login-success', listener)
    },
    // FrameWindow 要打开 LoginWindow
    openLoginWindow: () => ipcRenderer.send("frame-open-login"),
    onRouterNavigate: (cb) => ipcRenderer.on('router-navigate', (_, page) => cb(page)),
    // 开奖相关
    manualDraw: () => ipcRenderer.invoke('manual-draw'),
    startDraw: (payload) => ipcRenderer.invoke('start-draw', payload),
    stopDraw: () => ipcRenderer.invoke('stop-draw')
});
