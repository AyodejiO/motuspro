/*jshint esversion: 9 */

import axios from 'axios';
// import { get } from "lodash";

export default axios.create({
  baseURL:  `${process.env.REACT_APP_BACKEND_URL}`,
  // baseURL: `https://motuspro2.test/api/`,
  // baseURL: `https://api.motus.pro/api/`,
  headers: {
    'Content-Type': 'application/json',
  }
});

