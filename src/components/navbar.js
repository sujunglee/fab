import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: 'flex-start',
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: "100%",
    height: 30,
    backgroundColor: "#32332"
  },
  item: {
    backgroundColor: "#323232",
    width: "33%",
    height: "100%"
  },
  text: {
    backgroundColor: "#323232",
    color: "#F4F4F4",
    textAlign: "center",
    verticalAlign: "center"
  }
});

const Navbar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}><Text style={styles.text}>Vote</Text></View>
      <View style={styles.item}><Text style={styles.text}>Post</Text></View>
      <View style={styles.item}><Text style={styles.text}>My Posts</Text></View>
    </View>
  );
}

export default Navbar;
