/*jshint esversion: 6 */

import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

// eslint-disable-next-line
import {Button, Card, Icon, Table} from "antd";

import IntlMessages from "../../../../util/IntlMessages";

import {getVendors} from "../../../../appRedux/actions/Vendors";

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 200,
  render: text => <span className="gx-link">{text}</span>,
}, {
  title: 'Type',
  dataIndex: 'type',
  key: 'type',
  width: 250,
}, {
  title: 'Specialty',
  dataIndex: 'specialization',
  key: 'specialization',
}, {
  title: 'Action',
  key: 'action',
  width: 200,
  render: (text, record) => (
    <span>
      <span className="gx-link ant-dropdown-link">
        Actions <Icon type="down"/>
      </span>
    </span>
  ),
}];

// const expandedRowRender = record => <p>{record.description}</p>;
const showHeader = true;
const scroll = {y: 440};
const pagination = {position: 'bottom'};

class Vendors extends Component {
  state = {
    pagination,
    size: 'middle',
    showHeader,
    rowSelection: {},
    scroll,
  };

  componentDidMount = () =>
  {
    this.props.getVendors();
  }

  handleSizeChange = (e) => {
    this.setState({size: e.target.value});
  };

  handleShowForm = (e) => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  CreateNew = (
    <Link to="/vendors/new">
      <Button type="primary" size="default" icon="add" onClick={this.handleShowForm}>
        <IntlMessages id="sidebar.vendors.new"/>
      </Button>
    </Link>
  );

  render() {
    const {loading, allVendors} = this.props
    return (
      <div>
        <Card className="gx-card" title="Vendors" extra={this.CreateNew}>
          <Table className="gx-table-responsive" {...this.state} loading={loading} rowKey="id" columns={columns} dataSource={allVendors}/>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({auth, vendorData, commonData}) => {
  const {token} = auth;
  const {listSuccess, allVendors} = vendorData;
  const {loading} = commonData;
  return {token, listSuccess, loading, allVendors};
};

export default connect(mapStateToProps, {getVendors})(Vendors);