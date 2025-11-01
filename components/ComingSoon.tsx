import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const ComingSoonScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon ...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Optional: Customize your background color
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default ComingSoonScreen;
