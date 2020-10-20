import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../containers/Login";
import Logout from "../containers/Logout";
import Profile from "../components/Profile";

const Event = React.lazy(() => import("../containers/Event"));
const Hackathon = React.lazy(() => import("../containers/Hackathon"));
const OpenSource = React.lazy(() => import("../containers/OpenSource"));
const People = React.lazy(() => import("../containers/People"));
const Talk = React.lazy(() => import("../containers/Talks"));

export interface RoutesProps {}

export interface RoutesState {}

class Routes extends React.Component<RoutesProps, RoutesState> {
  render() {
    const fallback = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        Please wait...
      </div>
    );
    return (
      <Switch>
        <PrivateRoute exact path="/people">
          <React.Suspense fallback={fallback}>
            <People />
          </React.Suspense>
        </PrivateRoute>
        <PrivateRoute exact path="/event">
          <React.Suspense fallback={fallback}>
            <Event />
          </React.Suspense>
        </PrivateRoute>
        <PrivateRoute exact path="/talk">
          <React.Suspense fallback={fallback}>
            <Talk />
          </React.Suspense>
        </PrivateRoute>
        <PrivateRoute exact path="/hackathon">
          <React.Suspense fallback={fallback}>
            <Hackathon />
          </React.Suspense>
        </PrivateRoute>
        <PrivateRoute exact path="/opensource">
          <React.Suspense fallback={fallback}>
            <OpenSource />
          </React.Suspense>
        </PrivateRoute>
        <PrivateRoute exact path="/profile">
          <React.Suspense fallback={fallback}>
            <Profile />
          </React.Suspense>
        </PrivateRoute>

        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Redirect to="/people" />
      </Switch>
    );
  }
}

export default Routes;
