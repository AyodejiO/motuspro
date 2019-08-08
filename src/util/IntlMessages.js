/*jshint esversion: 9 */

import React from "react";
import {FormattedMessage, injectIntl} from "react-intl";

const InjectMassage = props => <FormattedMessage {...props} />;
export default injectIntl(InjectMassage, {
  withRef: false
});
