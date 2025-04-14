import axios from 'axios';
import Endpoint from './Endpoint';

const cache = new Map();
const DEFAULT_TTL = 5 * 60 * 1000;

const api = axios.create({
  baseURL: Endpoint.baseUrl, 
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

const getKey = (url, method, params = {}, data = {}, headers = {}) =>
  `${method.toUpperCase()}::${url}::${JSON.stringify(params)}::${JSON.stringify(data)}::${JSON.stringify(headers)}`;

const ApiService = {
  request({
    method = 'get',
    url,
    params = {},
    data = {},
    headers={},
    useCache = false,
    cacheTTL = DEFAULT_TTL,
    signal }) {
    const key = getKey(url, method, params, data,headers);

    if (useCache && cache.has(key)) {
      const { data: cachedData, timestamp } = cache.get(key);
      if (Date.now() - timestamp < cacheTTL) {
        return Promise.resolve(cachedData);
      }
      cache.delete(key);
    }

    return api({ 
      method,
       url, 
       params: method.toLowerCase() === 'get' ? params : undefined,
       data: method.toLowerCase() !== 'get' ? data : undefined,
       headers,
         signal
         }).then(res => {
      if (useCache) cache.set(key, { data: res.data, timestamp: Date.now() });
      return res.data;
    });
  },

  clearCache: () => cache.clear(),
};

export default ApiService;
