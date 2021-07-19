import React from 'react';

import { render } from '@testing-library/react-native'

import App from './App';

describe('<App />', () => {
  test('renders', () => {
    const app = render(<App />);

    expect(app).toBeTruthy();
  });
});