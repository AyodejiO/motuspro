import React, {Component} from "react";
// import {Link} from "react-router-dom";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {OrderFilterForm} from "./OrderFilter";
// eslint-disable-next-line
// import Moment from 'react-moment';
import {Button, Card, Table, Tag, notification} from "antd";

// import OrderFilter from "../newOrder";
import IntlMessages from "../../../../util/IntlMessages";

import {getOrders} from "../../../../appRedux/actions/Orders";
import {addOrder} from "../../../../appRedux/actions/Orders";
import {addOrderForm} from "../../../../appRedux/actions/Orders";

const { Column } = Table;
const showHeader = true;
const scroll = {y: 440};

class AllOrders extends Component {
  state = {
    size: 'middle',
    showHeader,
    visible: false,
    scroll,
  };

  componentDidMount = () => {
    this.props.getOrders(true, 'active', false);
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

  handleChange = () => {
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
    const {allOrders, createSuccess, loading, meta, newOrder} = this.props
    // const { getFieldDecorator} = this.props.form;
    if(createSuccess) {
      this.openNotification('success', newOrder);
      this.props.addOrderForm();
      return ( <Redirect to={`/orders/${newOrder}`}/> );
    }
    let pagination = {
      current: meta.current_page,
      defaultPageSize: meta.per_page,
      hideOnSinglePage: false,
      pageSizeOptions : ['30', '40'], 
      position: 'bottom',
      showSizeChanger : true,
      showTitle: true,
      size: 'small',
      total: meta.total
    }
    return (
      <div>
        <OrderFilterForm
          wrappedComponentRef={this.saveFormRef}
          onCreate={this.handleCreate}
          loading={loading}
        />
        <Card className="gx-card" title="Orders">
          <Table 
            className="gx-table-responsive" 
            dataSource={allOrders}
            {...this.state} 
            loading={loading} 
            pagination={pagination}
            rowKey="id" 
          >
            <Column 
              title="Reference" 
              dataIndex="motus_ref" 
              key="motus_ref" 
              width={150} 
              render={text => <Link to={`orders/${text}`}><span className="gx-link gx-text-info">{text}</span></Link>}
            />
            <Column title="Description" dataIndex="order_desc" key="order_desc" width={400} />
            <Column 
              title="Items" 
              dataIndex="items_count" 
              key="items_count" 
              width={100} 
              sorter={(a, b) => a.items_count - b.items_count}
              sortDirections={['descend', 'ascend']}
            />
            <Column 
              title="Status" 
              dataIndex="status" 
              key="status" 
              width={130} 
              filters={[
                {
                  text: 'active',
                  value: 'active',
                },
                {
                  text: 'inactive',
                  value: 'inactive',
                },
              ]}
              onFilter={(value, record) => record.status === value}
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
              title="Client" 
              dataIndex="client" 
              key="client" 
              width={150} 
              render={(text, record) => (
                <Link to={`clients`}>{record.client.name}</Link>
              )}
            />
          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({auth, commonData, ordersData}) => {
  const {token} = auth;
  const {allOrders, createSuccess, links, listSuccess, meta, newOrder} = ordersData;
  const {loading} = commonData;
  return {allOrders, createSuccess, links, listSuccess, loading, meta, newOrder, token};
};

export default connect(mapStateToProps, {addOrder, addOrderForm, getOrders})(AllOrders);