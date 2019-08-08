/*jshint esversion: 9 */

import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import routes from "../../routes/web.js";
const SubMenu = Menu.SubMenu;

class SidebarContent extends Component {

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };
  sidebarlink = (route, navStyle) => {
    // console.log("user", user);
    // if(!route.roles.includes(user.role)) {
    //   return null;
    // }
    if(route.type === 0) {                                                                                                                                                                                                                              
      return  (
        <Menu.Item key={route.key}>
          <Link to={route.link}>
            <i className={route.icon}/>
            <IntlMessages id={route.name}/>
          </Link>
        </Menu.Item>
      );
    }
    if(route.type === 1) {
      return (
        <SubMenu key={route.key} className={this.getNavStyleSubMenuClass(navStyle)}
                    title={<span> <i className={route.icon}/>
                    <IntlMessages id={route.name} /></span>}>
          {route.children.map((miniroute) => this.sidebarlink(miniroute, navStyle))}
        </SubMenu>
      )
    }
  }

  render() {
    const {authUser} = this.props;
    const {themeType, navStyle, pathname} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (<Auxiliary>

        <SidebarLogo/>
        <div className="gx-sidebar-content">
          <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile/>
            <AppsNavigation/>
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline">

              {authUser && authUser.account_verified_at ? routes[authUser.role].map((route) => this.sidebarlink(route, navStyle)): null} 

            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings, auth}) => {
  const {navStyle, themeType, locale, pathname} = settings;
  const {authUser} = auth;
  return {navStyle, themeType, locale, pathname, authUser};
};
export default connect(mapStateToProps)(SidebarContent);

