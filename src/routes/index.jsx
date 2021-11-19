import React, { useRef } from 'react'

import StackRoutes from './stack.routes'

import { NavigationContainer } from '@react-navigation/native'

import { routingInstrumentation } from '../../App'

const Routes = () => {
  const navigation = useRef();

  return (
    <NavigationContainer
      ref={navigation}
      onReady={() => {
        routingInstrumentation.registerNavigationContainer(navigation);
      }}>
      <StackRoutes />
    </NavigationContainer>
  )
}

export default Routes