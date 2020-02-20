import React from "react"
import { StyleSheet, SafeAreaView, Text, View, ScrollView } from "react-native"
import Results from "./src/components/results"
import Navbar from "./src/components/navbar"

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between"
  }
})

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <Results />
        </ScrollView>
        <Navbar />
      </View>
    </SafeAreaView>
  )
}

export default App
