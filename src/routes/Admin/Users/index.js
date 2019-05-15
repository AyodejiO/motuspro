/*jshint esversion: 6 */

import React from "react";
import {Route, Switch} from "react-router-dom";

import Admins from "./admins";
import Others from "./others";

const Users = ({match}) => (
  <Switch>
    <Route path={`${match.url}/admins`} component={Admins}/>
    <Route path={`${match.url}/others`} component={Others}/>
  </Switch>
);

export default Users;
