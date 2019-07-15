/*jshint esversion: 6 */
import React, {Component} from "react";
//eslint-disable-nextline
import {Card, Dropdown, Empty, Icon, Menu, Switch, Tag, notification} from "antd";
import {connect} from "react-redux";
import Items from './Items';
import {EditItemForm} from "./EditItem";
// import {OrderTimeline} from "./Timeline";
import {activateOrder} from "../../../../appRedux/actions/Orders";
import {getSingleOrder} from "../../../../appRedux/actions/Orders";
import {getCats} from "../../../../appRedux/actions/Cats";
import {editItem} from "../../../../appRedux/actions/Items";
import {editItemForm} from "../../../../appRedux/actions/Items";
const { Meta } = Card;

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
      this.props.getSingleOrder(ref, true);
      // this.props.getCats();
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

    status = () => {
      const {order} = this.props;
      const menu = (
        <Menu>
          <Menu.Item key="0" className="gx-px-2">
            <a href="#/"><Icon type="file-pdf" /> <span className="gx-ml-2">Generate Quote</span></a>
          </Menu.Item>
          <Menu.Item key="0" className="gx-px-2">
            <a href="#/"><Icon type="file" /> <span className="gx-ml-2">Make Note</span></a>
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
          badge = (<Tag color="#35506B">{order.status}</Tag>);
          break;
        default:
          badge = (<span>{order.status}</span>);
          break;
      }
      return (
        <>
          {badge}
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#/">
              More <Icon type="down" />
            </a>
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

    showModal = () => {
      this.setState({ visible: true });
    };

    saveItem = (item, values) => {
      const {ref} = this.props.match.params;
      this.props.editItem(ref, item, true, values);
    };

    showEditModal = (currentItem) => {
      this.setState({ 
        editVisible: true ,
        currentItem,
      });
    };

    deleteItem = (currentItem) => {
      console.log(currentItem);
      // this.setState({ 
      //   currentItem,
      // });
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
          extra={this.status()}
          title={`Order ${ref}`}
        >
          <Meta
            description={order? order.order_desc : ''}
          />
          {order? 
            (
              <Items 
                callback={this.showModal} 
                saveItem={this.saveItem} 
                deleteItem={this.deleteItem} 
                edit={this.showEditModal} 
                items={items} 
                loading={itemLoading}
                status={order.status}
                visible={items? items.length < 5 : false} 
              />
            ) :
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
