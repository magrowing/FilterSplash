import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from './routes';

import { Reset } from 'styled-reset';

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <main>
      <Reset />
      <RouterProvider router={router} />
    </main>
  );
}
