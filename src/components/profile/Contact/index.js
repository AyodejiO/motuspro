import React from "react";
import Moment from 'react-moment';
import {Link} from "react-router-dom";
import Widget from "components/Widget";

const CreateNew = (
  <Link to="/profile/edit">
    <i className="icon icon-setting gx-text-grey"/>
  </Link>
);

const Contact = ({user}) => {
  return (
    <Widget title="Contact" styleName="gx-card-profile-sm" extra={CreateNew}>
      <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
        <div className="gx-mr-3">
          <i className={`icon icon-email gx-fs-xxl gx-text-grey`}/>
        </div>
        <div className="gx-media-body">
          <span className="gx-mb-0 gx-text-grey gx-fs-sm">Email</span>
          <p className="gx-mb-0">
            <span className="gx-link">{user.email}</span>
          </p>
        </div>
      </div>
      <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
        <div className="gx-mr-3">
          <i className="icon icon-phone gx-fs-xxl gx-text-grey"/>
        </div>
        <div className="gx-media-body">
          <span className="gx-mb-0 gx-text-grey gx-fs-sm">Phone</span>
          <p className="gx-mb-0">
            <span className="gx-link">{user.phone}</span>
          </p>
        </div>
      </div>
      <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
        <div className="gx-mr-3">
          <i className="icon icon-calendar gx-fs-xxl gx-text-grey"/>
        </div>
        <div className="gx-media-body">
          <span className="gx-mb-0 gx-text-grey gx-fs-sm">Account created</span>
          <p className="gx-mb-0">
            <span className="gx-link"><Moment fromNow>{user.created_at}</Moment></span>
          </p>
        </div>
      </div>
    </Widget>
  )
}

export default Contact;
