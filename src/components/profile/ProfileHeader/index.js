import React from "react";
import {Avatar} from "antd";
import {Link} from "react-router-dom";
import placeholder from "assets/images/placeholder.jpg";

const ProfileHeader = ({user}) => {
  return (
    <div className="gx-profile-banner">
      <div className="gx-profile-container">
        <div className="gx-profile-banner-top">
          <div className="gx-profile-banner-top-left">
            <div className="gx-profile-banner-avatar">
              <Avatar className="gx-size-90" alt="..." src={user.avatar || placeholder}/>
            </div>
            <div className="gx-profile-banner-avatar-info">
              <h2 className="gx-mb-1 gx-mb-sm-2 gx-fs-xxl gx-font-weight-light">{user.name}</h2>
              {user.role === 'admin'? null : (<p className="gx-mb-0 gx-fs-lg">{user.org.name}, NG</p>)}
            </div>
          </div>
        </div>
        <div className="gx-profile-banner-bottom">
          {/* <div className="gx-tab-list">
            <ul className="gx-navbar-nav">
              <li>
                <span className="gx-link">Timeline</span>
              </li>
            </ul>
          </div> */}
          <span className="gx-link gx-profile-setting">
            <i className="icon icon-setting gx-fs-lg gx-mr-2 gx-mr-sm-3 gx-d-inline-flex gx-vertical-align-middle"/>
            <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
              <Link className="gx-text-white" to="/profile/edit">
                Edit Profile
              </Link>
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader;
