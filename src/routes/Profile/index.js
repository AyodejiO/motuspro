/*jshint esversion: 6 */

import React from "react";
import {Route, Switch} from "react-router-dom";

import MainProfile from "./Main";
import EditProfile from "./Edit";

const Profile = ({match}) => (
  <Switch>
    <Route exact path={`${match.url}/`} component={MainProfile}/>
    <Route path={`${match.url}/edit`} component={EditProfile}/>
  </Switch>
);

export default Profile;
