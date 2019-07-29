/*jshint esversion: 6 */

import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Auth from "./Auth";
import Bids from "./Bids";
import Cats from "./Cats";
import Clients from "./Clients";
import Common from "./Common";
import Orders from "./Orders";
import Items from "./Items";
import Profile from "./Profile";
import Settings from "./Settings";
import Users from "./Users";
import Vendors from "./Vendors";

const reducers = combineReducers({
  routing: routerReducer,
  auth: Auth,
  bidsData: Bids,
  catData: Cats,
  clientData: Clients,
  commonData: Common,
  ordersData: Orders,
  itemsData: Items,
  profileData: Profile,
  settings: Settings,
  userData: Users,
  vendorData: Vendors,
});

export default reducers;
