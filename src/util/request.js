import axios from 'axios';

/**
 * @method Request
 * @param {object} configs
 *
 * @return {promise}
 */

const Request = (configs = {}) => {
  const url = configs.path;
  const localDefaultHeaders = localStorage.defaultHeaders || '{}';
  const defaultHeaders = JSON.parse(localDefaultHeaders);
  const headers = { ...configs.headers, ...defaultHeaders };
  configs = { ...configs, headers, url };
  return axios(configs);
};

/**
 * @method addDefaultHeader
 * @param {string} key
 * @param {string} value
 */

export const addDefaultHeader = (key, value) => {
  if (!localStorage.defaultHeaders) {
    localStorage.defaultHeaders = '{}';
  }

  localStorage.defaultHeaders = JSON.stringify({
    ...JSON.parse(localStorage.defaultHeaders),
    [key]: value,
  });
};

/**
 * @method addDefaultHeader
 * @param {string} key
 * @param {string} value
 */

export const removeDefaultHeader = key => {
  let defaultHeadersStorage = JSON.parse(localStorage.defaultHeaders);
  delete defaultHeadersStorage[key];
  localStorage.defaultHeaders = JSON.stringify(defaultHeadersStorage);
};

export const GET = (path, configs = {}) =>
  Request({ ...configs, path, method: 'GET' });
export const POST = (path, configs = {}) =>
  Request({ ...configs, path, method: 'POST' });
export const PUT = (path, configs = {}) =>
  Request({ ...configs, path, method: 'PUT' });
export const PATCH = (path, configs = {}) =>
  Request({ ...configs, path, method: 'PATCH' });
export const DELETE = (path, configs = {}) =>
  Request({ ...configs, path, method: 'DELETE' });

export default Request;
