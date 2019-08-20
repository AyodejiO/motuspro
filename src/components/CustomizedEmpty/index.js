/*jshint esversion: 9 */

import React from "react";
import { Card, Empty } from "antd";

const CustomizedEmpty = (resource) => {
  return (
    <Card className="gx-card gx-text-center">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span>{`No ${resource || 'data'}, yet.`}</span>
        }
      >
      </Empty>
    </Card>
  );
}

export default CustomizedEmpty;
