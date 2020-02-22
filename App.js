import React, { useEffect, useState } from "react"
import * as Font from "expo-font"
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
  const [isFontLoaded, setisFontLoaded] = useState(false)
  useEffect(() => {
    const load = async () => {
      /*
        To add more of the fonts, go see what's in assets/fonts
        Add it to the object loading async below, and set the key to a kebab-cased version of the font name
      */
      await Font.loadAsync({
        "source-sans-pro-regular": require("./assets/fonts/SourceSansPro-Regular.ttf"),
        "source-sans-pro-bold": require("./assets/fonts/SourceSansPro-Bold.ttf"),
        "source-sans-pro-semibold": require("./assets/fonts/SourceSansPro-SemiBold.ttf")
      })
      setisFontLoaded(true)
    }

    load()
  }, [])
  return (
    isFontLoaded && (
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    )
  )
}

export default App
