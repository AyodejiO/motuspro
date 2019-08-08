/*jshint esversion: 9 */

import React from "react";
import {Route, Switch} from "react-router-dom";

import AllJobs from "./allJobs";
// import NewJob from "./newJob";
// import SingleJob from "./singleJob";

const Jobs = ({match}) => (
  <Switch>
    <Route exact path={`${match.url}/`} component={AllJobs}/>
    {/* <Route path={`${match.url}/new`} component={NewBid}/> */}
    {/* <Route path={`${match.url}/:ref`} component={SingleBid}/> */}
  </Switch>
);

export default Jobs;
