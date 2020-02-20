import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Results from "./src/components/results"
import Navbar from "./src/components/navbar"

const App = () => {
  return (
    <View>
      <Results />
      <Navbar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})

export default App
