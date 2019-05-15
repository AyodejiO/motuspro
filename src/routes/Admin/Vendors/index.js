/*jshint esversion: 6 */

import React from "react";
import {Route, Switch} from "react-router-dom";

import AllVendors from "./allVendors";
import NewVendor from "./newVendor";
import SingleVendor from "./singleVendor";

const Vendors = ({match}) => (
  <Switch>
    <Route exact path={`${match.url}/`} component={AllVendors}/>
    <Route path={`${match.url}/new`} component={NewVendor}/>
    <Route path={`${match.url}/single`} component={SingleVendor}/>
  </Switch>
);

export default Vendors;
