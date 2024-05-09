import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { routes } from './routes';

import { Reset } from 'styled-reset';

import GlobalStyle from './styles/GlobalStyle';
import defaultTheme from './styles/defaultTheme';

import './App.css';

const router = createBrowserRouter(routes);
const theme = defaultTheme;

export default function App() {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <Reset />
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </main>
  );
}
