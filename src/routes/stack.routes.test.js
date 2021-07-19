import React from 'react'

import { render, fireEvent, act } from "test-utils"

import StackRoutes from './stack.routes'

describe('Testing React Navigation', () => {
  test('clicking on continue button takes you to system info screen', () => {
    const { getByTestId } = render(<StackRoutes />)

    const button = getByTestId('button1')

    const input = getByTestId('input')

    fireEvent.changeText(input, '1')

    fireEvent.press(button)

    const SystemInfoScreen = getByTestId('system-info-screen')

    expect(SystemInfoScreen).toBeTruthy()
  })

   test('clicking on continue button takes you to playground screen', async () => {
    const { getByTestId } = render(<StackRoutes />)

    const input = getByTestId('input')
    
    fireEvent.changeText(input, '1')
    
    await act( async () => {
      const processesInfoButton = getByTestId('button1')

      fireEvent.press(processesInfoButton)
    })

    await act( async () => {
      const systemInfoButton = getByTestId('button2')
      fireEvent.press(systemInfoButton)
    })

    const playgroundScreen = getByTestId('playground-screen')
    
    expect(playgroundScreen).toBeTruthy()
  })
})
