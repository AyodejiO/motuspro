import React from "react";
import { Empty, Timeline } from 'antd';
import _ from 'lodash';
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
    {_.isEmpty(activities)? 
      (<Empty
        description={
          <span>
            No order activity, yet.
          </span>
        }
      >
      </Empty>) : 
      (<Timeline>
        {activities.map((activity) => 
            <Item key={activity.id} color={colorType(activity.properties.status)}>
              {activity.description} 
              <small className="gx-text-purple"> {activity.created_at}</small>
            </Item>
        )}
      </Timeline>)
    }
  </div>
);