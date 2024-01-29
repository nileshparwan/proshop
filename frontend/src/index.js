import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Spinner from './components/Spinner';
import store from './store';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
const App = React.lazy(() => import('./App'));
const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const ProductScreen = React.lazy(() => import('./screens/ProductScreen'));
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
          <Suspense fallback={<Spinner />}>
            <HomeScreen />
          </Suspense>
        )
      },
      {
        path: '/product/:id',
        element: (
          <Suspense fallback={<Spinner />}>
            <ProductScreen />
          </Suspense>
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
