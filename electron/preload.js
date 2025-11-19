const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  manualDraw: (p)=> ipcRenderer.invoke('manual-draw', p),
  startDraw: (p)=> ipcRenderer.invoke('start-draw', p),
  stopDraw: ()=> ipcRenderer.invoke('stop-draw')
});
