import React from "react";
import { Timeline } from 'antd';
const { Item } = Timeline;

const colorType = status => {
    switch(status) {
        case 'success':
                return 'blue';
        default:
            return 'blue';
    }
}

export const OrderTimeline = ({activities}) => (
  <div>
      <Timeline>
        {activities.map((activity) => 
            <Item key={activity.id} color={colorType(activity.properties.status)}>{activity.description}</Item>
        )}
      </Timeline>
  </div>
);