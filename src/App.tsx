/** @format */

import './styles/App.scss';
import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Component
import AppLayout from './app-layout/AppLayout';
import PageComponents from './components/MUI/AppContent/PageComponents/PageComponents';
import { LoadingSpinner } from './components/APP/SuspenseLoader';
// ******************* Util
import { RANDOM_UNIQUE } from './utils/getUnique';

// ************************* Pages
const SignIn = lazy(() => import('./pages/Authorizations/SignIn'));
const SignUp = lazy(() => import('./pages/Authorizations/Signup'));
const ForgotPassword = lazy(
  () => import('./pages/Authorizations/ForgotPassword')
);
const OtpVerify = lazy(() => import('./pages/Authorizations/OTPVerify'));
const ResetPassword = lazy(
  () => import('./pages/Authorizations/ResetPassword')
);
const RequestDemo = lazy(() => import('./pages/Others/RequestDemo'));
const PageNotFound = lazy(() => import('./components/APP/PageNotFound/page'));
import {  useLocation, useNavigate } from 'react-router-dom';

// ******************* App Data
import { APP_ROUTES } from './data/AppRoutes';

// ************ Socket
import Socket from './libs/SocketService.ts';

function App() {
  // *********** connect socket
  Socket.CONNECT_SOCKET();

  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (
      location.pathname === '/sales10x/dasboard' ||
      location.pathname === '/sales10x/superadmin/dashboard'
    ) {
      window.history.pushState(null, document.title, window.location.href);
      window.addEventListener('popstate', function (_event: any) {
        window.history.pushState(null, document.title, window.location.href);
      });
    }
    if(location.pathname === '/sales10x') navigate('/sales10x/dasboard')
  }, [location]);

  return (
    <>
      <Routes>
        <Route
          path={APP_ROUTES?.SIGN_IN?.pathName}
          element={
            <Suspense fallback={<LoadingSpinner message='Loading ... ' />}>
              <SignIn />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES?.SIGN_UP?.pathName}
          element={
            <Suspense fallback={<LoadingSpinner message='Loading ... ' />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES?.FORGOT_PASSWORD?.pathName}
          element={
            <Suspense fallback={<LoadingSpinner message='Loading ... ' />}>
              <ForgotPassword />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES?.OTP_VERIFY?.pathName}
          element={
            <Suspense fallback={<LoadingSpinner message='Loading ... ' />}>
              <OtpVerify />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES?.RESET_PASSWORD?.pathName}
          element={
            <Suspense fallback={<LoadingSpinner message='Loading ... ' />}>
              <ResetPassword />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES?.REQUEST_DEMO?.pathName}
          element={
            <Suspense fallback={<LoadingSpinner message='Loading ... ' />}>
              <RequestDemo />
            </Suspense>
          }
        />

        <Route
          path={APP_ROUTES?.LANDING?.pathName}
          element={<AppLayout />}
          key={RANDOM_UNIQUE()}>
          {...PageComponents()}
        </Route>
        <Route
          path='*'
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PageNotFound />
            </Suspense>
          }></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
