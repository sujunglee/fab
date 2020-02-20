import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Results from './src/results';
import firebase from 'firebase/app';
import 'firebase/database';

const App = ()=> {
  return (
    <Results />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const firebaseConfig = {
  apiKey: "AIzaSyDmf0O7did9GrPKJV0FxuE8DXMJ6lUHY0o",
  authDomain: "fabapp-a1ea0.firebaseapp.com",
  databaseURL: "https://fabapp-a1ea0.firebaseio.com",
  projectId: "fabapp-a1ea0",
  storageBucket: "fabapp-a1ea0.appspot.com",
  messagingSenderId: "418449602579",
  appId: "1:418449602579:web:4ea8b998481214931fa7e6",
  measurementId: "G-PKT3GQ71QK"
};

firebase.initializeApp(firebaseConfig);
const db =  firebase.database();

export { db };
export default App;
