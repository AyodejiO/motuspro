/*jshint esversion: 9 */

import React from "react";
import {Col, Row} from "antd";
import {connect} from "react-redux";
import {Area, AreaChart, ResponsiveContainer, Tooltip} from "recharts";
import {citiesData, propertiesData, queriesData, visitsData} from "./data";

import TaskList from "components/dashboard/CRM/TaskList";
import ChartCard from "components/dashboard/Listing/ChartCard";
import RecentActivity from "components/dashboard/CRM/RecentActivity";
import TicketList from "components/dashboard/CRM/TicketList";
import TaskByStatus from "components/dashboard/CRM/TaskByStatus";
import Overview from "components/dashboard/CRM/Overview";
import Auxiliary from "util/Auxiliary";
import TotalRevenueCard from "components/dashboard/CRM/TotalRevenueCard";
import NewCustomers from "components/dashboard/CRM/NewCustomers";
import GrowthCard from "components/dashboard/CRM/GrowthCard";
import Widget from "components/Widget/index";
import CurrencyCalculator from "components/dashboard/Crypto/CurrencyCalculator";
import IconWithTextCard from "components/Metrics/IconWithTextCard";
import {recentActivity, taskList, trafficData} from "./data";

const CRM = ({authUser}) => {
  return (
    <Auxiliary>
      <Row>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard chartProperties={{
            title: 'Clients',
            prize: '26,873',
            icon: 'stats',
            bgColor: 'secondary',
            styleName: 'up',
            desc: 'All time',
            percent: '03%',
            color: 'white'
          }}
                     children={<ResponsiveContainer width="100%" height={75}>
                       <AreaChart data={propertiesData}
                                  margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                         <Tooltip/>
                         <Area dataKey='properties' strokeWidth={0} stackId="2" stroke='#003366' fill="#003366"
                               fillOpacity={1}/>
                       </AreaChart>
                     </ResponsiveContainer>}
          />

        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard
            chartProperties={{
              title: 'CITIES',
              prize: '3,840',
              icon: 'stats',
              bgColor: 'orange',
              styleName: 'up',
              desc: '7 New cities this week',
              percent: '',
            }}
            children={<ResponsiveContainer width="100%" height={75}>
              <AreaChart data={citiesData}
                         margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <Tooltip/>
                <Area dataKey='cities' type='monotone' strokeWidth={0} stackId="2" stroke='#C87000'
                      fill="#C87000"
                      fillOpacity={1}/>
              </AreaChart>
            </ResponsiveContainer>}
          />
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard
            chartProperties={{
              title: 'ONLINE VISITS',
              prize: '84,729',
              icon: 'stats',
              bgColor: 'teal',
              styleName: 'down',
              desc: 'Avg. 327 visits daily',
              percent: '',
            }}
            children={<ResponsiveContainer width="100%" height={75}>
              <AreaChart data={visitsData}
                         margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <Tooltip/>
                <Area dataKey='visit' strokeWidth={0} stackId="2" stroke='#158765' fill="#158765"
                      fillOpacity={1}/>
              </AreaChart>
            </ResponsiveContainer>}
          />
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard
            chartProperties={{
              title: 'ONLINE QUERIES',
              prize: '87,239',
              icon: 'stats',
              bgColor: 'pink',
              styleName: 'down',
              desc: 'from past month',
              percent: '39',
            }}
            children={<ResponsiveContainer width="100%" height={75}>
              <AreaChart data={queriesData}
                         margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <Tooltip/>
                <Area dataKey='queries' strokeWidth={0} stackId="2" stroke='#BB1258' fill="#BB1258"
                      fillOpacity={1}/>
              </AreaChart>
            </ResponsiveContainer>}
          />
        </Col>
      </Row>
      <Row>
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
        <Col xl={8} lg={24} md={8} sm={24} xs={24}>
          <TotalRevenueCard/>
        </Col>
        <Col xl={8} lg={12} md={8} sm={24} xs={24}>
          <NewCustomers/>
        </Col>
        <Col xl={8} lg={12} md={8} sm={24} xs={24}>
          <GrowthCard trafficData={trafficData}/>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24} className="gx-order-sm-2">
          <Widget>
            <RecentActivity recentList={recentActivity} shape="circle"/>
          </Widget>
          <CurrencyCalculator/>
        </Col>
        <Col xl={16} lg={24} md={24} sm={24} xs={24} className="gx-order-sm-1">
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard cardColor="cyan" icon="diamond" title="09" subTitle="Projects"/>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard cardColor="orange" icon="tasks" title="687" subTitle="Tasks"/>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard cardColor="teal" icon="team" title="04" subTitle="Teams"/>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <IconWithTextCard cardColor="red" icon="files" title="09" subTitle="Files"/>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <TaskList taskList={taskList}/>
            </Col>
            <Col xl={16} lg={16} md={16} sm={24} xs={24}>
              <TicketList/>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24}>
              <TaskByStatus/>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Overview/>
            </Col>
          </Row>
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
