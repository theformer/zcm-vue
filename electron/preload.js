const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    login: (payload) => ipcRenderer.invoke('login-attempt', payload),

    // 主窗口可监听登录成功事件
    onLoginSuccess: (cb) => ipcRenderer.on('login-success', (e, data) => cb(data)),

    manualDraw: () => ipcRenderer.invoke('manual-draw'),
    startDraw: (payload) => ipcRenderer.invoke('start-draw', payload),
    stopDraw: () => ipcRenderer.invoke('stop-draw')
});
