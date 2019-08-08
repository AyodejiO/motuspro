/*jshint esversion: 9 */

import React from "react";
import {Route, Switch} from "react-router-dom";

import AllOrders from "./allOrders";
// import NewOrder from "./newOrder";
import SingleOrder from "./singleOrder";

const Orders = ({match}) => (
  <Switch>
    <Route exact path={`${match.url}/`} component={AllOrders}/>
    {/* <Route path={`${match.url}/new`} component={NewOrder}/> */}
    <Route path={`${match.url}/:ref`} component={SingleOrder}/>
  </Switch>
);

export default Orders;
