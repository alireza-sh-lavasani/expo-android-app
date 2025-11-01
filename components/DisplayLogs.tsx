import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';

const logFilePath = FileSystem.documentDirectory + 'aafiat-network-status-log.txt';

const ViewLogs = () => {
  const [logs, setLogs] = useState('');

  const loadLogs = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(logFilePath);
      if (fileInfo.exists) {
        const logContent = await FileSystem.readAsStringAsync(logFilePath);
        setLogs(logContent);
      } else {
        setLogs('No logs found');
      }
    } catch (error) {
      console.error('Error reading log file:', error);
      setLogs('Error reading log file');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Load Logs" onPress={loadLogs} />
      <ScrollView style={{ marginTop: 20, maxHeight: 400 }}>
        <Text>{logs}</Text>
      </ScrollView>
    </View>
  );
};

export default ViewLogs;
