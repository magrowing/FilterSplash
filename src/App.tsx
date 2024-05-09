import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { routes } from './routes';

import { Reset } from 'styled-reset';

import '../public/css/font.css';

import GlobalStyle from './styles/GlobalStyle';
import defaultTheme from './styles/defaultTheme';

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
