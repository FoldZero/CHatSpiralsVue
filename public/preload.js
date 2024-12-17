const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  sendQuery: (message) => ipcRenderer.invoke('chatgpt-query', message)
});
