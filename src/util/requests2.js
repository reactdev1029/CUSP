import axios from 'axios';

const getHeadersWithToken = () => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Standalone-Application': 'seriea'
    }
  };

  return {
    headers: {
      ...headers.headers,
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  };
};

export function queryGETWithToken(url) {
  return axios.get(url, getHeadersWithToken());
}

export function queryPOSTWithToken(url, data) {
  return axios.post(url, data, getHeadersWithToken());
}

export function queryDELETEWithToken(url) {
  return axios.delete(url, getHeadersWithToken());
}
