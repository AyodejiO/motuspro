/*jshint esversion: 9 */

import React, {Component} from "react";
// import {Link} from "react-router-dom";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {NewOrderForm} from "../newOrder";
// eslint-disable-next-line
// import Moment from 'react-moment';
import {Button, Card, Dropdown, Icon, Menu, Table, Tag, notification} from "antd";

// import NewOrder from "../newOrder";
import IntlMessages from "../../../../util/IntlMessages";

import {getOrders} from "../../../../appRedux/actions/Orders";
import {addOrder} from "../../../../appRedux/actions/Orders";
import {addOrderForm} from "../../../../appRedux/actions/Orders";

const { Column } = Table;

// const columns = [
// {
//   title: 'Created',
//   dataIndex: 'created_at',
//   key: 'created_at',
//   width: 150,
//   render: (text) => {
//     if(text) {
//       return (<Moment format="DD/MM/YYYY">{text}</Moment>);
//     }
//   },
// },
// ];

// const expandedRowRender = record => <p>{record.description}</p>;
const showHeader = true;
const scroll = {y: 440};
const pagination = {position: 'bottom'};

class AllOrders extends Component {
  state = {
    pagination,
    size: 'middle',
    showHeader,
    visible: false,
    rowSelection: {},
    scroll,
  };

  componentDidMount = () =>
  {
    this.props.getOrders();
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.addOrder(values);
        return;
      }
      // console.log('Received values of form: ', values);
      // form.resetFields();
      // this.setState({ visible: false });
    });
  };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  openNotification = (type, ref) => {
    notification[type]({
      message: `Order ${ref} created`,
      description: 'You can now add items to order.'
    });
  };

  CreateNew = loading => (
    <Button type="primary" disabled={loading} size="default" icon="add" onClick={this.showModal}>
      <IntlMessages id="sidebar.orders.new"/>
    </Button>
  );

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const {createSuccess, loading, allOrders, newOrder} = this.props
    if(createSuccess) {
      this.openNotification('success', newOrder);
      this.props.addOrderForm();
      return ( <Redirect to={`/orders/${newOrder}`}/> );
    }
    return (
      <div>
        <Card className="gx-card" title="Orders" extra={this.CreateNew(loading)}>
          <Table 
            className="gx-table-responsive" 
            {...this.state} 
            loading={loading} 
            rowKey="id" 
            dataSource={allOrders}
          >
            <Column 
              title="Reference" 
              dataIndex="client_ref" 
              key="client_ref" 
              width={150} 
              render={text => <Link to={`orders/${text}`}><span className="gx-link gx-text-info">{text}</span></Link>}
            />
            <Column title="Description" dataIndex="order_desc" key="order_desc" width={400} />
            <Column title="Items" dataIndex="items_count" key="items_count" width={100} />
            <Column 
              title="Status" 
              dataIndex="status" 
              key="status" 
              width={130} 
              render={(text) => {  
                  switch(text) {
                    case 'inactive':
                      return (<Tag color="#ff6601">{text}</Tag>)
                    case 'active':
                        return (<Tag color="#003366">{text}</Tag>)
                    default:
                      return (<span>{text}</span>);
                      // break
                  }
                }
              }
            />
            <Column 
              title="Action" 
              dataIndex="action" 
              key="action" 
              render={(text, record) => (
                <Dropdown trigger={['click']} overlay={
                  <Menu>
                    {record.status === 'inactive' && record.items_count > 0? (<Menu.Item key={1} className="gx-px-5">
                      <a href="http://www.alipay.com/">
                        Activate {text} 
                      </a>
                    </Menu.Item>) : null}
                    <Menu.Item key={2} className="gx-px-5">
                      <a href="http://www.alipay.com/">
                        Delete {text}
                      </a>
                    </Menu.Item>
                  </Menu>
                }>
                  <span className="gx-link ant-dropdown-link">
                    Actions <Icon type="down"/>
                  </span>
                </Dropdown>
              )}
            />
          </Table>
        </Card>
        <NewOrderForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          confirmLoading={loading}
        />
      </div>
    );
  }
}

const mapStateToProps = ({auth, ordersData, commonData}) => {
  const {token} = auth;
  const {listSuccess, createSuccess, allOrders, newOrder} = ordersData;
  const {loading} = commonData;
  return {token, listSuccess, loading, allOrders, createSuccess, newOrder};
};

export default connect(mapStateToProps, {addOrder, addOrderForm, getOrders})(AllOrders);