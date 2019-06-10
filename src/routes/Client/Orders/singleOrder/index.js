/*jshint esversion: 6 */
import React, {Component} from "react";
//eslint-disable-nextline
import {Card, Empty, Icon, Switch, Tabs, Tag, notification} from "antd";
import {connect} from "react-redux";
import {Items} from './Items';
import {NewItemForm} from "./NewItem";
import {EditItemForm} from "./EditItem";
import {getSingleOrder} from "../../../../appRedux/actions/Orders";
import {getCats} from "../../../../appRedux/actions/Cats";
import {addItem} from "../../../../appRedux/actions/Items";
import {editItem} from "../../../../appRedux/actions/Items";
import {addItemForm} from "../../../../appRedux/actions/Items";
import {editItemForm} from "../../../../appRedux/actions/Items";
const { Meta } = Card;
const { TabPane } = Tabs;

class SingleOrder extends Component {
    state = {
      key: 'tab1',
      noTitleKey: 'app',
      currentItem: null,
      visible: false,
      editVisible: false,
    };

    onTabChange = (key, type) => {
      console.log(key, type);
      this.setState({ [type]: key });
    };
    
    componentDidMount() {
      const {ref} = this.props.match.params;
      // console.log(slug);
      this.props.getSingleOrder(ref);
      this.props.getCats();
    }

    saveFormRef = formRef => {
      this.formRef = formRef;
    };

    handleCancel = () => {
      this.setState({ 
        visible: false, 
        editVisible: false 
      });
    };
  
    handleCreate = () => {
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

    handleEdit = () => {
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

    status = (order) => {
      if(!order) {return;};
      switch(order.status) {
        case 'inactive':
          return (<><Tag color="#ff6601">{order.status}</Tag></>)
        case 'active':
            return (<><Tag color="#003366">{order.status}</Tag></>)
        default:
          return (<><span>{order.status}</span></>);
          // break
      }
    }

    extra = () => {
      const {order, items} = this.props;
      if(!order) {return null};
      if(!items || items.length < 1) {return null};
      return (
        <Switch checked={order.status === 'active'} disabled={order.status === 'ended'} checkedChildren="Active" unCheckedChildren={order.status} onChange={this.activate} />
      )      
    }

    showModal = () => {
      this.setState({ visible: true });
    };

    showEditModal = (currentItem) => {
      this.setState({ 
        editVisible: true ,
        currentItem,
      });
    };

    openNotification = (type) => {
      notification[type]({
        message: `Item added`,
        description: 'Activate this order when you\'re done.'
      });
    };
  
    render() {
      const {currentItem} = this.state;
      const {ref} = this.props.match.params;
      const {cats, createSuccess, order, items, loading, itemLoading} = this.props;
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
          extra={this.extra()}
          title={`Order ${ref}`}
        >
          <Meta
            description={order? order.order_desc : ''}
          />
          {order? 
            (<Tabs defaultActiveKey="1" tabPosition="top" className="gx-mt-5">
              <TabPane
                tab={
                  <span>
                    <Icon type="unordered-list" />
                    Items
                  </span>
                }
                key="1"
              >
                <Items items={items} visible={items.length < 5} callback={this.showModal} edit={this.showEditModal} />
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
                Tab 2
              </TabPane>
            </Tabs>) :
            (
              <Empty
                description={
                  <span>
                    Order "{ref}" not found.
                  </span>
                } 
              />)
          }
          <NewItemForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible && items.length < 5}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            confirmLoading={itemLoading}
            cats={cats}
          />
          {currentItem?
            <EditItemForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.editVisible}
              onCancel={this.handleCancel}
              onCreate={this.handleEdit}
              confirmLoading={itemLoading}
              cats={cats}
              item={this.state.currentItem}
            /> : 
          null}
        </Card>
      );
    }
  }

const mapStateToProps = ({auth, catData, itemsData, ordersData, commonData}) => {
  const {token} = auth;
  const {cats} = catData;
  const {order} = ordersData;
  const {createSuccess, items, itemLoading} = itemsData;
  const {loading} = commonData;
  return {cats, createSuccess, token, items, itemLoading, loading, order};
};
  
export default connect(mapStateToProps, {addItem, addItemForm, editItem, editItemForm, getCats, getSingleOrder})(SingleOrder);
