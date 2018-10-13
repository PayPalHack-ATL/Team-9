import Promise from 'bluebird';
import axios from 'axios';

axios.interceptors.response.use(response => {
  return response.data;
}, error => {
  return Promise.reject(error.response.data);
});

const request = (url, process) => {
  const tokens = url.split('/');
  return (...args) => {
    return new Promise((resolve, reject) => {
      const mappedURL = '/api' + tokens.map((token, i) => token.startsWith(':') ? args.shift() : token).join('/');
      return resolve(process(mappedURL, args));
    });
  };
};

const GET = URL => {
  return request(URL, (mappedURL, args) => {
    const [params] = args;
    return axios.get(mappedURL, { params });
  });
};

const DELETE = URL => {
  return request(URL, (mappedURL, args) => {
    const [params] = args;
    return axios.delete(mappedURL, { params });
  });
};

const POST = URL => {
  return request(URL, (mappedURL, args) => {
    const [body, params] = args;
    return axios.post(mappedURL, body, { params });
  });
};

const PUT = URL => {
  return request(URL, (mappedURL, args) => {
    const [body, params] = args;
    return axios.put(mappedURL, body, { params });
  });
};

const AuthApi = {
  createAuth: POST('/auth/'),
  destroyAuth: DELETE('/auth/'),
};

const AuctionApi = {
  allAuctions: GET('/auction/'),
  addAuction: POST('/auction/'),
  getAuction: GET('/auction/:auction_id'),
  updateAuction: PUT('/auction/:auction_id'),
  deleteAuction: DELETE('/auction/:auction_id'),
};

const UserApi = {
  allUsers: GET('/user/'),
  addUser: POST('/user/'),
  getUser: GET('/user/:user_id'),
  updateUser: PUT('/user/:user_id'),
  deleteUser: DELETE('/user/:user_id'),
};

const ImageApi = {
  original: id => `/api/image/${id}/original`,
  thumbnail: (id, size) => `/api/image/${id}/thumbnail/${size}`,
};

export {
  AuthApi,
  AuctionApi,
  UserApi,
  ImageApi,
};
