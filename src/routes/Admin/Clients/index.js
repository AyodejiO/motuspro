/*jshint esversion: 9 */

import React from "react";
import {Route, Switch} from "react-router-dom";

import AllClients from "./allClients";
import NewClient from "./newClient";
import SingleClient from "./singleClient";

const Clients = ({match}) => (
  <Switch>
    <Route exact path={`${match.url}/`} component={AllClients}/>
    <Route path={`${match.url}/new`} component={NewClient}/>
    <Route path={`${match.url}/single`} component={SingleClient}/>
  </Switch>
);

export default Clients;
