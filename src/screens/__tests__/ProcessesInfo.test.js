import React from 'react'

import ProcessesInfo from '../ProcessesInfo'

import { render, fireEvent } from 'test-utils'

test('renders the right amount of processes', () => {
  const { getByTestId, getAllByText } = render(<ProcessesInfo />)

  const input = getByTestId('input')

  fireEvent.changeText(input, '4')

  const items = getAllByText(/Processo /)

  expect(items.length).toBe(4)
})