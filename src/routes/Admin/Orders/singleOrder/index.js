/*jshint esversion: 9 */
import React, {Component} from "react";
//eslint-disable-nextline
import {Button, Card, Dropdown, Empty, Icon, Menu, Spin, Switch, Tabs, Tag} from "antd";
import {connect} from "react-redux";
import Items from './items';
import InfoView from "components/InfoView";
import Bids from './items/Bids';
import {OrderNoteForm} from './OrderNote';
import {OrderTimeline} from "components/Orders/Timeline";
import {activateOrder,editOrder,getSingleOrder} from "../../../../appRedux/actions/Orders";
import {editItem,editItemForm, getItemBids} from "../../../../appRedux/actions/Items";
const { Meta } = Card;
const { TabPane } = Tabs;

class SingleOrder extends Component {
    state = {
      key: 'tab1',
      noTitleKey: 'app',
      currentItem: null,
      visible: false,
      bidVisible: false,
      noteVisible: false,
    };

    componentDidMount() {
      const {ref} = this.props.match.params;
      this.props.getSingleOrder(ref, true);
    }

    onTabChange = (key, type) => {
      console.log(key, type);
      this.setState({ [type]: key });
    };

    saveFormRef = formRef => {
      this.formRef = formRef;
    };

    handleCancel = () => {
      this.setState({ 
        visible: false, 
        editVisible: false,
        noteVisible: false 
      });
    };

    showModal = () => {
      this.setState({ visible: true });
    };

    orderNoteModal = () => {
      this.setState({ 
        noteVisible: true
      });
    };

    handleEditItem = (item, values) => {
      const {ref} = this.props.match.params;
      this.props.editItem(item, values, true);
    };

    handleEditOrder = () => {
      const {ref} = this.props.match.params;
      const form = this.formRef.props.form;
      this.setState({ 
        noteVisible: false 
      });
      form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          this.props.editOrder(ref, values, true);
          return;
        }
      });
    };

    status = () => {
      const {order} = this.props;
      const menu = (
        <Menu>
          <Menu.Item key={0} className="gx-px-2">
            <Button className="gx-mb-0 gx-p-0" type='link'><Icon type="file-pdf" /> <span className="gx-ml-2">Generate Quote</span></Button>
          </Menu.Item>
          <Menu.Item key={1} className="gx-px-2">
            <Button className="gx-mb-0 gx-p-0" type='link' onClick={this.orderNoteModal}>
              <Icon type="file" /> <span className="gx-ml-2">Make Note</span>
            </Button>
          </Menu.Item>
        </Menu>
      );
      let badge = '';
      const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
      if(!order) {return;};
      switch(order.status) {
        case 'inactive':
          badge = (<Tag color="#ff6601">{order.status}</Tag>);
          break;
        case 'active':
          badge = (<Tag color="#003366">{order.status}</Tag>);
          break;
        default:
          badge = (<span>{order.status}</span>);
          break;
      }
      return (
        <>
          <Spin spinning={this.props.orderLoading} indicator={antIcon}>
            {badge}
            <Dropdown overlay={menu} trigger={['click']}>
              <Button className="gx-mb-0 gx-p-0 ant-dropdown-link" type='link'>More <Icon type="down" /></Button>
            </Dropdown>
          </Spin>
        </>
      )
    }

    extra = () => {
      const {activating, orderItems, order} = this.props;
      if(!order) {return null};
      if(!orderItems || orderItems.length < 1) {return null};
      return (
        <>
          <Switch 
            checked={order.status === 'active'} 
            checkedChildren="Active" 
            disabled={order.status === 'active'} 
            loading={activating}
            unCheckedChildren={order.status} 
            onChange={() => this.props.activateOrder(order.client_ref)} 
          />
        </>
      )      
    }
  
    render() {
      const {bidVisible, currentItem, noteVisible} = this.state;
      const {ref} = this.props.match.params;
      const {activities, order, orderItems, loading, itemLoading, orderLoading} = this.props;
      return (
        <Card 
          className="gx-card" 
          loading={loading}
          extra={this.status()}
          title={`Order ${ref}`}
        >
          <Meta
            description={order? order.order_desc : ''}
          />
          {order? 
            (<div>
              <Tabs defaultActiveKey="1" tabPosition="top" className="gx-mt-5">
                <TabPane
                  tab={
                    <span>
                      <Icon type="unordered-list" />
                      Items
                    </span>
                  }
                  key="1"
                >
                  <Items 
                    items={orderItems} 
                    status={order.status}
                    loading={itemLoading}
                    callback={this.showModal} 
                    updateItem={this.handleEditItem} 
                    visible={orderItems? orderItems.length < 5 : false} 
                  />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <Icon type="fund" />
                      Timeline
                    </span>
                  }
                  key="2"
                >
                  <div className="gx-p-5">
                    <OrderTimeline activities={activities} />
                  </div>
                </TabPane>
              </Tabs>
              <OrderNoteForm
                wrappedComponentRef={this.saveFormRef}
                visible={noteVisible}
                onCancel={this.handleCancel}
                onCreate={this.handleEditOrder}
                confirmLoading={orderLoading}
                order={order}
              /> 
            </div>) :
            (
              <Empty
                description={
                  <span>
                    Order "{ref}" not found.
                  </span>
                } 
              />)
          }
          {currentItem?
            <Bids
              wrappedComponentRef={this.saveFormRef}
              visible={bidVisible}
              onCancel={this.handleCancel}
              onCreate={this.handleEditItem}
              confirmLoading={itemLoading}
              item={currentItem}
            /> : 
          null}
          <InfoView/>
        </Card>
      );
    }
  }

const mapStateToProps = ({itemsData, ordersData, commonData}) => {
  const {order, orderLoading, activities} = ordersData;
  const {createSuccess, getItemBids, orderItems, itemLoading} = itemsData;
  const {loading, message} = commonData;
  return {activities, createSuccess, getItemBids, itemLoading, loading, message, order, orderItems, orderLoading};
};
  
export default connect(mapStateToProps, {
  activateOrder, 
  editItem, 
  editItemForm, 
  editOrder,
  getItemBids,
  getSingleOrder
})(SingleOrder);
