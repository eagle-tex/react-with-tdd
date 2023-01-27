import axios from 'axios';
import i18n from '../locale/i18n';
import { store } from '../state/store';

// NOTE: request/response interceptors are processed before
//   req/res are sent to the target/client or component
axios.interceptors.request.use(request => {
  request.headers['Accept-Language'] = i18n.language;
  request.headers['Authorization'] = store.getState().header;
  return request;
});

export const signUp = body => {
  return axios.post('/api/1.0/users', body);
};

export const activate = token => {
  return axios.post(`/api/1.0/users/token/${token}`);
};

export const loadUsers = page => {
  return axios.get('/api/1.0/users', { params: { page, size: 3 } });
};

export const getUserById = id => {
  return axios.get(`/api/1.0/users/${id}`);
};

export const login = body => {
  return axios.post('/api/1.0/auth', body);
};

export const updateUser = (id, body, header) => {
  return axios.put(`/api/1.0/users/${id}`, body, {
    headers: {
      Authorization: header
    }
  });
};
