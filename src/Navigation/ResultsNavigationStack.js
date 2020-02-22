import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Results, MyPostsPage } from "../views"
import { screens } from "./constants"

const Stack = createStackNavigator()

const ResultsNavigationStack = () => {
  return (
    <Stack.Navigator initialRouteName={screens.POSTS_PAGE}>
      <Stack.Screen
        component={MyPostsPage}
        name={screens.POSTS_PAGE}
        options={{ title: "My Posts" }}
      />
      <Stack.Screen component={Results} name={screens.RESULTS} />
    </Stack.Navigator>
  )
}

export default ResultsNavigationStack
