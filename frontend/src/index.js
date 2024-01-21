import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Spinner from './components/Spinner';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
const App = React.lazy(() => import('./App')); 
const HomeScreen = React.lazy(() => import('./screens/HomeScreen')); 
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
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
