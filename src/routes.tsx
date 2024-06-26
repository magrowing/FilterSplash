import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import Home from './pages/Home';
import Search from './pages/Search';
import Collection from './pages/Collection';
import Profile from './pages/Profile';
import Account from './pages/Account';

import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import FindPassword from './pages/FindPassword';

export const routes = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/:id',
        element: <Home />,
      },
      {
        path: 'search/:id',
        element: <Search />,
      },
      {
        path: '/collection',
        element: <Collection />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/account',
        element: <Account />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
  },
  {
    path: '/find-password',
    element: <FindPassword />,
  },
];
