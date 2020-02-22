import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Results } from "../views"
import { screens } from "./constants"

const Stack = createStackNavigator()

const ResultsNavigationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Results} name={screens.RESULTS} />
    </Stack.Navigator>
  )
}

export default ResultsNavigationStack
