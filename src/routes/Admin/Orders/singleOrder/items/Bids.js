/*jshint esversion: 9 */

import React from "react";
import { Modal } from 'antd';

class Bids extends React.Component {
  
  render() {
    const { bids, visible } = this.props;
    
    return (
      <Modal
        visible={visible}
        title="Add Item"
        width="900px"
        okText="Add"
      >

      </Modal>
    );
  }
}

export default Bids;