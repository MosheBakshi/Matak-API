import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MyAccountScreen from "./screens/MyAccountScreen";
import AdminScreen from "./screens/AdminScreen";
import Notifications from "./screens/Notification";
import PrivateRoute from "./PrivateRoute";
import RoutesManagement from "./screens/RoutesManagment/RoutesManagement";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LoginScreen} exact />
        <PrivateRoute path="/home" component={HomeScreen} />
        <PrivateRoute path="/my-account" component={MyAccountScreen} />
        <PrivateRoute path="/routes-management" component={RoutesManagement} />
        <PrivateRoute path="/admin-panel" component={AdminScreen} />
        <PrivateRoute path="/notifications" component={Notifications} />
      </Switch>
    </Router>
  );
}
export default App;
