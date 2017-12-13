/**
 * 此文件为axios ajax的统一设置,包括请求拦截，post处理等
 */
import axios from 'axios';
import qs from 'qs';

const http = axios.create({
  baseURL: 'http://test1.doooly.com',
 // baseURL: '/reachtest',
  timeout:35000,
  withCredentials: true
});
http.interceptors.request.use((req) => {
 if (req.method === 'post') {
    req.data = qs.stringify(req.data)

  }
  return req
}, err =>{
  return Promise.reject(err)
} );
export default http



