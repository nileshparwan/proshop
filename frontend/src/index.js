import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
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
const PrivateRoute = React.lazy(() => import('./components/routes/PrivateRoute'));
const PaymentScreen = React.lazy(() => import('./screens/PaymentScreen'));
const PlaceOrderScreen = React.lazy(() => import('./screens/PlaceOrderScreen'));
const OrderScreen = React.lazy(() => import('./screens/OrderScreen'));
const ProfileScreen = React.lazy(() => import('./screens/ProfileScreen'));
const OrderListScreen = React.lazy(() => import('./screens/admin/OrderListScreen'));
const ProductListScreen = React.lazy(() => import('./screens/admin/ProductListScreen'));
const ProductEditScreen = React.lazy(() => import('./screens/admin/ProductEditScreen'));
const UserListScreen = React.lazy(() => import('./screens/admin/UserListScreen'));
const AdminRoute = React.lazy(() => import('./components/routes/AdminRoute'));

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route
      path="/"
      index={true}
      element={<HomeScreen />}
    />

    <Route
      path="/product/:id"
      element={<ProductScreen />}
    />

    <Route
      path="/cart"
      element={<CartScreen />}
    />

    <Route
      path="/login"
      element={<LoginScreen />}
    />

    <Route
      path="/register"
      element={<RegisterScreen />}
    />

    <Route path='' element={<PrivateRoute />}>
      <Route
        path='/shipping'
        element={<ShippingScreen />}
      />

      <Route
        path='/payment'
        element={<PaymentScreen />}
      />

      <Route
        path='/placeorder'
        element={<PlaceOrderScreen />}
      />

      <Route
        path='/order/:id'
        element={<OrderScreen />}
      />

      <Route
        path='/profile'
        element={<ProfileScreen />}
      />
    </Route>

    {/* admin */}
    <Route path='' element={<AdminRoute />}>
      <Route
        path='/admin/orderList'
        element={<OrderListScreen />}
      />

      <Route
        path='/admin/productList'
        element={<ProductListScreen />}
      />

      <Route
        path='/admin/product/:id/edit'
        element={<ProductEditScreen />}
      />

      <Route
        path='/admin/userList'
        element={<UserListScreen />}
      />
    </Route>
  </Route>
));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <React.Suspense fallback={<></>}>
          <RouterProvider router={router} />
        </React.Suspense>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
