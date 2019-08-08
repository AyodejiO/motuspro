/*jshint esversion: 9 */

import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

// eslint-disable-next-line
import Moment from 'react-moment';
import {Button, Card, Icon, Table} from "antd";

import IntlMessages from "../../../../../util/IntlMessages";
import {getUsers} from "../../../../../appRedux/actions/Users";

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 200,
  render: text => <span className="gx-link">{text}</span>,
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email',
  width: 200,
}, {
  title: 'Phone',
  dataIndex: 'phone',
  key: 'phone',
  width: 150,
}, {
  title: 'Type',
  dataIndex: 'role',
  key: 'role',
  width: 60,
}, {
  title: 'Activation Date',
  dataIndex: 'account_verified_at',
  key: 'account_verified_at',
  width: 100,
  render: (text) => {
    if(text) {
      return (<Moment format="DD/MM/YYYY">{text}</Moment>);
    }
    // ({text? (<Moment>{text}</Moment>) : null})
  },
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

class Users extends Component {
  state = {
    pagination,
    size: 'middle',
    showHeader,
    rowSelection: {},
    scroll,
  };

  componentDidMount = () =>
  {
    this.props.getUsers();
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
    <Link to="/users/new">
      <Button type="primary" size="default" icon="add" onClick={this.handleShowForm}>
        <IntlMessages id="sidebar.users.new"/>
      </Button>
    </Link>
  );

  render() {
    const {loading, allUsers} = this.props;
    return (
      <div>
        <Card className="gx-card" title="Other Users">
          <Table className="gx-table-responsive" {...this.state} loading={loading} rowKey="id" columns={columns} dataSource={allUsers}/>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({auth, userData, commonData}) => {
  const {token} = auth;
  const {listSuccess, allUsers} = userData;
  const {loading} = commonData;
  return {token, listSuccess, loading, allUsers};
};

export default connect(mapStateToProps, {getUsers})(Users);