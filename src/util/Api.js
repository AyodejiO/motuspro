/*jshint esversion: 6 */

import axios from 'axios';
// import { get } from "lodash";

export default axios.create({
  baseURL: `https://motuspro2.test/api/`,
  // baseURL: `https://api.motus.pro/api/`,
  headers: {
    'Content-Type': 'application/json',
  }
});
