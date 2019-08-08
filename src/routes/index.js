/*jshint esversion: 9 */

import React from "react";
import _ from "lodash";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

import routes from "./web.js";

function getRoutes(subroutes, match){
  // console.log(subroutes);
  return subroutes.map((prop, key) => {
    return (
      <Route path={`${match.url}${prop.path}`} key={key} component={asyncComponent(() => prop.component)} />
      // <Route path={`${match.url}${prop.path}`} key={key} component={asyncComponent(prop.component)} />
    );
  });
};

const App = ({user, match}) => (
  <div className="gx-main-content-wrapper">
      {_.isEmpty(user)? null : (
        <>
          {user.account_verified_at? null : (<Redirect to={'/profile/edit'}/>) }
          <Switch>
            {getRoutes(routes[user.role], match)}
            {/* <Route path={`${match.url}sample`} component={asyncComponent(() => import('./SamplePage'))}/> */}
            {/* <Route path={`${match.url}dashboard`} component={asyncComponent(() => import('./Dashboard/index'))}/>
            <Route path={`${match.url}orders`} component={asyncComponent(() => import('./Dashboard/index'))}/>
            <Route path={`${match.url}clients`} component={asyncComponent(() => import('./Dashboard/index'))}/>
            <Route path={`${match.url}vendors`} component={asyncComponent(() => import('./Dashboard/index'))}/>
            <Route path={`${match.url}users`} component={asyncComponent(() => import('./Dashboard/index'))}/>
            <Route path={`${match.url}profile`} component={asyncComponent(() => import('./Dashboard/index'))}/> */}
          </Switch>
        </>)
      }
  </div>
);

export default App;
