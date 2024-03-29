/*jshint esversion: 9 */

import React from 'react';
// import CircularProgress from "components/CircularProgress/index";
import {message} from 'antd';
// import Auxiliary from "util/Auxiliary";
import {connect} from "react-redux";
import {hideMessage} from "appRedux/actions/Common";

class InfoView extends React.Component {
  componentDidUpdate() {
    const {error, displayMessage} = this.props;
    if(displayMessage && (displayMessage !== null || displayMessage !== "")) {
      message.success(displayMessage);
    }
    if(error && (error !== null || error !== "")) {
      message.error(error);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error || nextProps.message || nextProps.displayMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
  }

  render() {
    return (
      <>
        
      </>
    );
  }
}

const mapStateToProps = ({commonData}) => {
  const {error, loading} = commonData;
  const displayMessage = commonData.message;
  return {error, loading, displayMessage};
};

export default connect(mapStateToProps, {hideMessage})(InfoView);
