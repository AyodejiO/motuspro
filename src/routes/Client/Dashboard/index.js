/*jshint esversion: 6 */

import React from "react";
import {connect} from "react-redux";
import {Col, Row} from "antd";

import SiteVisit from "components/dashboard/CRM/SiteVisit";
import RecentActivity from "components/dashboard/CRM/RecentActivity";
import ClientWelComeCard from "components/dashboard/CRM/ClientWelComeCard";
import Auxiliary from "util/Auxiliary";
import Widget from "components/Widget/index";
import IconWithTextCard from "components/Metrics/IconWithTextCard";
import {recentActivity} from "./data";

const CRM = ({authUser, loading}) => {
  return (
    <Auxiliary>
      <Row>
        <Col span={24}>
          <div className="gx-card">
            <div className="gx-card-body">
              <Row>
                <Col xl={9} lg={12} md={12} sm={12} xs={24}>
                  <ClientWelComeCard authUser={authUser} />
                </Col>
                <Col xl={15} lg={24} md={24} sm={24} xs={24} className="gx-visit-col">
                  <SiteVisit/>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard icon="orders" title="09" subTitle="Orders"/>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard icon="tasks" title="687" subTitle="bids"/>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard icon="shopping-cart" title="04" subTitle="Items procured"/>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard cardColor="white" icon="attachment" title="09" subTitle="Files uploaded"/>
            </Col>
          </Row>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24} className="gx-order-sm-2">
          <Widget>
            <RecentActivity recentList={recentActivity} shape="circle"/>
          </Widget>
        </Col>
        <Col xl={16} lg={24} md={24} sm={24} xs={24} className="gx-order-sm-1">
          {/* <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard icon="orders" title="09" subTitle="Orders"/>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard icon="tasks" title="687" subTitle="bids"/>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard icon="team" title="04" subTitle="Teammates"/>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard cardColor="white" icon="attachment" title="09" subTitle="Files uploaded"/>
            </Col>
          </Row> */}
        </Col>
      </Row>
    </Auxiliary>
  );
};

const mapStateToProps = ({auth, commonData}) => {
  const {authUser} = auth;
  const {loading} = commonData;
  return {authUser, loading};
};
  
export default connect(mapStateToProps, {})(CRM);
