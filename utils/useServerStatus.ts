import { useState, useEffect } from 'react';
import { EXPO_PUBLIC_BACKEND_URL } from './constants';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const url = EXPO_PUBLIC_BACKEND_URL;
const logFilePath = FileSystem.documentDirectory + 'aafiat-network-status-log.txt';

const logToFile = async (message: string) => {
  try {
    const timestamp = new Date().toISOString();
    let existingLogs = '';

    // Check if the log file exists
    const fileInfo = await FileSystem.getInfoAsync(logFilePath);
    if (fileInfo.exists) {
      existingLogs = await FileSystem.readAsStringAsync(logFilePath);
    }

    const newLog = `${existingLogs}${timestamp}: ${message}\n`;
    await FileSystem.writeAsStringAsync(logFilePath, newLog, {
      encoding: FileSystem.EncodingType.UTF8,
    });
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
};

export const useServerStatus = (interval = 3000) => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkNetworkStatus = async () => {
      try {
        // await logToFile('Checking network status...');
        // await logToFile(`URL: ${url}`);
        // await logToFile(`Interval: ${interval}`);

        // Check if the endpoint is reachable
        await axios.get(url, { timeout: 2000 });
        setIsOnline(true);
        // await logToFile('Server is online');
      } catch (error: any) {
        setIsOnline(false);
        // await logToFile('Server is offline');
        // await logToFile(`Error: ${error?.message}`);
        // await logToFile(JSON.stringify(error));
      }
    };

    // Check the network status immediately and then at specified intervals
    checkNetworkStatus();
    const intervalId = setInterval(checkNetworkStatus, interval);

    // Log that the custom hook is in use
    // logToFile('useServerStatus hook is in use');

    return () => clearInterval(intervalId);
  }, [url, interval]);

  return { isOnline };
};
