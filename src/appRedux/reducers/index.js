/*jshint esversion: 9 */

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
import Quotes from "./Quotes";
import Settings from "./Settings";
import Users from "./Users";
import Vendors from "./Vendors";

const reducers = combineReducers({
  auth: Auth,
  bidsData: Bids,
  catData: Cats,
  clientData: Clients,
  commonData: Common,
  itemsData: Items,
  ordersData: Orders,
  profileData: Profile,
  quotesData: Quotes,
  routing: routerReducer,
  settings: Settings,
  userData: Users,
  vendorData: Vendors,
});

export default reducers;
