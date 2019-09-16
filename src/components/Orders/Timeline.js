import React from "react";
import { Empty, Timeline } from 'antd';
import _ from 'lodash';
import Moment from 'react-moment';
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
              <small className="gx-text-purple gx-ml-2">
                <Moment format="DD/MMM/YYYY H:m:s">
                  {activity.created_at}
                </Moment> 
              </small>
            </Item>
        )}
      </Timeline>)
    }
  </div>
);