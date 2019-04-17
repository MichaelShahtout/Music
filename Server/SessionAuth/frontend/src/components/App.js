import React from 'react';
import Welcome from "./Welcome";
import Login from ".Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import {AuthRoute, ProtectedRoute} from "../util/route";


export default () => {
  <>
  <Route exact path="/" component={Welcome} /> 
    <AuthRoute path="/login" component={Login} /> 
  <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
      <ProtectedRoute path="/dashboard" component={Dashboard} /> 
      <Route path="/dashboard" component={Dashboard} />


  <h1> Hello World </h1>
  </>
}
