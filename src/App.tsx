import { useEffect, useState } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';

import { ThemeProvider } from 'styled-components';

import { routes } from './routes';

import { Reset } from 'styled-reset';

import GlobalStyle from './styles/GlobalStyle';
import defaultTheme from './styles/defaultTheme';

import { auth } from './firebase/firebase';

import LoadingScreen from './components/LoadingScreen';

const router = createBrowserRouter(routes);
const theme = defaultTheme;

export default function App() {
  const [isLoading, setLoading] = useState(true);

  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <main>
      <ThemeProvider theme={theme}>
        <Reset />
        <GlobalStyle />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </ThemeProvider>
    </main>
  );
}
