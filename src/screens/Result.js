import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useSelector } from 'react-redux';

export default Result = props => {
  const correctNum = useSelector(state => state.app.correctNum);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>
        Score: { correctNum / 2.0 }
      </Text>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={props.testAgain}
        >
          <Text>Test Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: '100%',
  },
  score: {
    marginTop: 80
  },
  buttonWrapper: {
    marginTop: 50
  }
});