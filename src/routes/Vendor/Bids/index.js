/*jshint esversion: 6 */

import React from "react";
import {Route, Switch} from "react-router-dom";

import AllBids from "./allBids";
// import NewBid from "./newBid";
// import SingleBid from "./singleBid";

const Bids = ({match}) => (
  <Switch>
    <Route exact path={`${match.url}/`} component={AllBids}/>
    {/* <Route path={`${match.url}/new`} component={NewBid}/> */}
    {/* <Route path={`${match.url}/:ref`} component={SingleBid}/> */}
  </Switch>
);

export default Bids;
