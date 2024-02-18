import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';

const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const ProductScreen = React.lazy(() => import('./screens/ProductScreen'));
const CartScreen = React.lazy(() => import('./screens/CartScreen'));
const LoginScreen = React.lazy(() => import('./screens/LoginScreen'));
const RegisterScreen = React.lazy(() => import('./screens/RegisterScreen'));
const ShippingScreen = React.lazy(() => import('./screens/ShippingScreen'));
const PrivateRoute = React.lazy(() => import('./screens/PrivateRoute'));

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route
      path="/"
      index={true}
      element={
        <React.Suspense fallback="loading...">
          <HomeScreen />
        </React.Suspense>
      }
    />

    <Route
      path="/product/:id"
      element={
        <React.Suspense fallback="loading...">
          <ProductScreen />
        </React.Suspense>
      }
    />

    <Route
      path="/cart"
      element={
        <React.Suspense fallback="loading...">
          <CartScreen />
        </React.Suspense>
      }
    />

    <Route
      path="/login"
      element={
        <React.Suspense fallback="loading...">
          <LoginScreen />
        </React.Suspense>
      }
    />

    <Route
      path="/register"
      element={
        <React.Suspense fallback="loading...">
          <RegisterScreen />
        </React.Suspense>
      }
    />

    <Route path='' element={<PrivateRoute />}>
      <Route path='/shipping' element={<ShippingScreen />} />
    </Route>
  </Route>
));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
