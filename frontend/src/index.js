import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
import LoginScreen from './screens/LoginScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        index: true,
        element: (
            <HomeScreen />
        )
      },
      {
        path: '/product/:id',
        element: (
            <ProductScreen />
        )
      },
      {
        path: '/cart',
        element: (
            <CartScreen />
        )
      },
      {
        path: '/login',
        element: (
            <LoginScreen />
        )
      }
    ]
  }
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
