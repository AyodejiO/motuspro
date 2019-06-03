/*jshint esversion: 6 */
import React, {Component} from "react";
import {Button, Card, Empty, Icon, Switch, Tabs} from "antd";
import {connect} from "react-redux";
import {Items} from './Items';
import {getSingleOrder} from "../../../../appRedux/actions/Orders";
import {addOrder} from "../../../../appRedux/actions/Orders";
import {addOrderForm} from "../../../../appRedux/actions/Orders";
const { Meta } = Card;
const { TabPane } = Tabs;

class SingleOrder extends Component {
    state = {
      key: 'tab1',
      noTitleKey: 'app',
    };

    onTabChange = (key, type) => {
      console.log(key, type);
      this.setState({ [type]: key });
    };
    
    componentDidMount() {
      const {ref} = this.props.match.params;
      // console.log(slug);
      this.props.getSingleOrder(ref);
    }

    extra = (
      <>
        {/* <Button key="1" type="primary">
          Primary
        </Button> */}
        <Switch checked={false} onChange={this.onChange} />
      </>
    );
  
    render() {
      const {ref} = this.props.match.params;
      const {order, loading} = this.props;
      console.log(order);
      return (
        <Card 
          className="gx-card" 
          loading={loading}
          extra={this.extra}
        >
          <Meta
            title={`Order ${ref}`}
            description={order? order.order_desc : ''}
          />
          {order? 
            (<Tabs defaultActiveKey="1" className="gx-mt-5">
              <TabPane
                tab={
                  <span>
                    <Icon type="unordered-list" />
                    Items
                  </span>
                }
                key="1"
              >
                <Items items={order.items} />
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
        </Card>
      );
    }
  }

const mapStateToProps = ({auth, ordersData, commonData}) => {
  const {token} = auth;
  const {listSuccess, order} = ordersData;
  const {loading} = commonData;
  return {token, listSuccess, loading, order};
};
  
export default connect(mapStateToProps, {addOrder, addOrderForm, getSingleOrder})(SingleOrder);
