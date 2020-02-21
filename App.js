import React from "react"
import { StyleSheet, Text, View, ScrollView } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Navigation } from "./src/Navigation/"

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between"
  }
})

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  )
}

export default App
