import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import SystemInfo from '../screens/SystemInfo'
import ProcessesInfo from '../screens/ProcessesInfo'
import PlayGround from '../screens/PlayGround'

import colors from '../util/colors'

const StackRoutes = createStackNavigator()

const index = () => {
  return (
    <StackRoutes.Navigator
      headerMode="none"
      initialRouteName={'SystemInfo'}
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white
        }
      }}>
        <StackRoutes.Screen
          name="SystemInfo"
          component={SystemInfo} 
        />
        <StackRoutes.Screen
          name="ProcessesInfo"
          component={ProcessesInfo} 
        />
        <StackRoutes.Screen
          name="PlayGround"
          component={PlayGround} 
        />
    </StackRoutes.Navigator>
  )
}

export default index