const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const axios = require('axios');

const DEBUG = process.env.DEBUG === 'true'; // Enable debug if set in .env
const debugLogPath = path.join(app.getPath('userData'), 'debug.log');

function logDebug(message) {
  if (DEBUG) {
    const logMessage = `${new Date().toISOString()} - DEBUG: ${message}\n`;
    fs.appendFileSync(debugLogPath, logMessage, 'utf8');
    console.log(logMessage); // Log to console for development
  }
}

let mainWindow;

app.on('ready', () => {
  logDebug('App is ready. Creating main window...');
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  logDebug('Main window loaded.');
});

ipcMain.handle('chatgpt-query', async (event, userMessage) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  logDebug(`Received message from renderer: ${userMessage}`);

  try {
    const response = await axios.post(
      endpoint,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    const result = response.data.choices[0].message.content;
    logDebug(`Response from ChatGPT API: ${result}`);
    return result;
  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || error.message;
    logDebug(`Error fetching data from ChatGPT API: ${errorMessage}`);
    return 'An error occurred while fetching the response.';
  }
});
