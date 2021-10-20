import { useEffect, lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import AppBar from "./components/AppBar";
import Loader from "./components/Loader/Loader";
import Container from "./components/Container";

import authOperations from "./redux/auth/auth-operations";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const HomePage = lazy(() =>
  import("./pages/HomePage" /* webpackChunkName: "HomePage" */)
);
const UserPage = lazy(() =>
  import("./pages/UserPage" /* webpackChunkName: "UserPage" */)
);
const SignUpPage = lazy(() =>
  import("./pages/SignUpPage" /* webpackChunkName: "SignUpPage" */)
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage" /* webpackChunkName: "LoginPage" */)
);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(authOperations.getCurrentUserData()), [dispatch]);

  return (
    <Container>
      <AppBar />

      <Suspense fallback={<Loader />}>
        <Switch>
          <PublicRoute exact path="/">
            <HomePage />
          </PublicRoute>
          <PrivateRoute path="/contacts" redirectTo="/login">
            <UserPage />
          </PrivateRoute>
          <PublicRoute path="/register" restricted redirectTo="/contacts">
            <SignUpPage />
          </PublicRoute>
          <PublicRoute path="/login" restricted redirectTo="/contacts">
            <LoginPage />
          </PublicRoute>
        </Switch>
      </Suspense>
    </Container>
  );
};

export default App;
