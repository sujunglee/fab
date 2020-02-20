import React from "react"
import { StyleSheet, SafeAreaView, Text, View } from "react-native"
import Results from "./src/components/results"
import Navbar from "./src/components/navbar"

const App = () => {
  return (
    <SafeAreaView>
      <Results />
      <Navbar />
    </SafeAreaView>
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
