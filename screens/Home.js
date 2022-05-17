import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Home = ({navigation}) => {
  return <View style={styles.container}>
      <Text>Home page</Text>
  </View>;
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
export default Home;
