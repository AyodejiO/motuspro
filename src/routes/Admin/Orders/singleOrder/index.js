/*jshint esversion: 9 */
import React, {Component} from "react";
//eslint-disable-nextline
import {Button, Card, Dropdown, Empty, Icon, Menu, Switch, Tabs, Tag, notification} from "antd";
import {connect} from "react-redux";
import Items from './Items';
import {CreateBidForm} from './CreateBid';
import {OrderNoteForm} from './OrderNote';
import {OrderTimeline} from "components/Orders/Timeline";
import {activateOrder} from "../../../../appRedux/actions/Orders";
import {getSingleOrder} from "../../../../appRedux/actions/Orders";
import {getCats} from "../../../../appRedux/actions/Cats";
import {editItem} from "../../../../appRedux/actions/Items";
import {editItemForm} from "../../../../appRedux/actions/Items";
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
      // console.log(slug);
      this.props.getSingleOrder(ref, true);
      // this.props.getCats();
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

    updateItem = (item, values) => {
      const {ref} = this.props.match.params;
      this.props.editItem(ref, item, values, true);
    };

    orderNoteModal = () => {
      this.setState({ 
        noteVisible: true
      });
    };

    deleteItem = (currentItem) => {
      console.log(currentItem);
      // this.setState({ 
      //   currentItem,
      // });
    };

    handleEditOrder = () => {
      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          // const {order} = this.props;
          // this.props.addItem(order.client_ref, values);
          // return;
        }
      });
    };

    handleEditItem = () => {
      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          const {order} = this.props;
          this.props.addItem(order.client_ref, values);
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
          {/* <Menu.Divider />
          <Menu.Item key="2">3rd menu item</Menu.Item> */}
        </Menu>
      );
      let badge = '';
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
          {badge}
          <Dropdown overlay={menu} trigger={['click']}>
            <Button className="gx-mb-0 gx-p-0 ant-dropdown-link" type='link'>More <Icon type="down" /></Button>
          </Dropdown>
        </>
      )
    }

    extra = () => {
      const {activating, items, order} = this.props;
      if(!order) {return null};
      if(!items || items.length < 1) {return null};
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

    openNotification = (type) => {
      notification[type]({
        message: `Item added`,
        description: 'Activate this order when you\'re done.'
      });
    };
  
    render() {
      const {bidVisible, currentItem, noteVisible} = this.state;
      const {ref} = this.props.match.params;
      const {activities, cats, createSuccess, order, items, loading, itemLoading} = this.props;
      if(createSuccess) {
        this.openNotification('success');
        this.setState({ visible: false });
        this.props.addItemForm();
      }
      // console.log(order);
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
                    items={items} 
                    status={order.status}
                    loading={itemLoading}
                    callback={this.showModal} 
                    updateItem={this.updateItem} 
                    visible={items? items.length < 5 : false} 
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
                confirmLoading={loading}
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
            <CreateBidForm
              wrappedComponentRef={this.saveFormRef}
              visible={bidVisible}
              onCancel={this.handleCancel}
              onCreate={this.handleEditItem}
              confirmLoading={itemLoading}
              cats={cats}
              item={currentItem}
            /> : 
          null}
        </Card>
      );
    }
  }

const mapStateToProps = ({auth, catData, itemsData, ordersData, commonData}) => {
  const {token} = auth;
  const {cats} = catData;
  const {order, activating, activities} = ordersData;
  const {createSuccess, items, itemLoading} = itemsData;
  const {loading} = commonData;
  return {activating, activities, cats, createSuccess, token, items, itemLoading, loading, order};
};
  
export default connect(mapStateToProps, {
  activateOrder, 
  editItem, 
  editItemForm, 
  getCats, 
  getSingleOrder
})(SingleOrder);
