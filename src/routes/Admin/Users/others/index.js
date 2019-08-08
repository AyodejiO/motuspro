/*jshint esversion: 9 */

import React from "react";
import {Route, Switch} from "react-router-dom";

import AllUsers from "./allUsers";
import NewUser from "./newUser";
import SingleUser from "./singleUser";

const Others = ({match}) => (
  <Switch>
    <Route exact path={`${match.url}/`} component={AllUsers}/>
    <Route path={`${match.url}/new`} component={NewUser}/>
    <Route path={`${match.url}/single`} component={SingleUser}/>
  </Switch>
);

export default Others;
