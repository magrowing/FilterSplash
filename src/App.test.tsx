import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('App render Test', () => {
    render(<App />);

    screen.getByText(/리스트/);
  });
});
