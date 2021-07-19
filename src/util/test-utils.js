import React from 'react'

import { render } from '@testing-library/react-native'

import { NavigationContainer } from '@react-navigation/native'

const Providers = ({ children }) => {
  return (
    <NavigationContainer>
      {children}
    </NavigationContainer>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { customRender as render }