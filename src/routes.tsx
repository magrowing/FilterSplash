import Layout from './components/Layout';
import Home from './pages/Home';
import Category from './pages/Category';
import Collection from './pages/Collection';
import Profile from './pages/Profile';
import Account from './pages/Account';

import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import FindPassword from './pages/FindPassword';
import ProtectedRoute from './components/ProtectedRoute';

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
        path: '/category/:id',
        element: <Category />,
      },
      {
        path: '/collection',
        element: <Collection />,
      },
      {
        path: '/profile/:id',
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
