import axios from 'axios';
import _ from 'lodash';

import {
  flattenResponse,
  decamelizeKeys,
  transformServerError,
} from 'utils/APIHelpers';

import configApi from 'config/api';

let accessToken = localStorage.getItem('checklyst:auth:accessToken');
let clientToken = localStorage.getItem('checklyst:auth:clientToken');
let uidToken = localStorage.getItem('checklyst:auth:uidToken');

const setTokens = (tokens) => {
  accessToken = tokens.accessToken;
  clientToken = tokens.clientToken;
  uidToken = tokens.uidToken;
  localStorage.setItem('checklyst:auth:accessToken', accessToken);
  localStorage.setItem('checklyst:auth:clientToken', clientToken);
  localStorage.setItem('checklyst:auth:uidToken', uidToken);
};

const send = (method, url, data) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (clientToken && accessToken && uidToken) {
    _.extend(headers, {
      'client': clientToken,
      'access-token': accessToken,
      'uid': uidToken,
      'token-type': 'Bearer',
    });
  }

  return axios({
    baseURL: configApi.endpoint,
    url: url,
    method: method,
    data: data,
    headers: headers,
  }).then((response) => {
    setTokens({
      accessToken: response.headers['access-token'],
      clientToken: response.headers.client,
      uidToken: response.headers.uid,
    });
    return response.data;
  }).catch((error) => {
    throw transformServerError(error);
  });
};

const ServerAPI = {

  signin: ({data}) => {
    return send('post', '/api/auth/sign_in', decamelizeKeys(data));
  },

  signup: ({data}) => {
    return send('post', '/api/auth', decamelizeKeys(data));
  },

  signout: () => {
    return send('delete', '/api/auth/sign_out');
  },

  validateToken: () => {
    return send('get', '/api/auth/validate_token');
  },

  createProject: ({data}) => {
    return send('post', '/api/projects', {data})
      .then(flattenResponse);
  },

  findAllProjects: () => {
    return send('get', '/api/projects?include=checklists,user')
      .then(flattenResponse);
  },

  findProject: (projectId) => {
    return send('get', `/api/projects/${projectId}?include=checklists,versions,user`)
      .then(flattenResponse);
  },

  createChecklist: ({data}) => {
    return send('post', `/api/projects/${data.project}/checklists`, {
      data: decamelizeKeys(data),
    }).then(flattenResponse);
  },

  updateChecklist: ({data}) => {
    return send('put', `/api/projects/${data.project}/checklists/${data.checklistId}`, {
      data: decamelizeKeys(data),
    }).then(flattenResponse);
  },

  findChecklists: ({projectId}) => {
    return send('get', `/api/projects/${projectId}/checklists?include=project,last_version`)
      .then(flattenResponse);
  },

  findChecklist: ({projectId, checklistId}) => {
    return send('get', `/api/projects/${projectId}/checklists/${checklistId}?include=project,last_version`)
      .then(flattenResponse);
  },

  deleteChecklist: ({projectId, checklistId}) => {
    return send('delete', `/api/projects/${projectId}/checklists/${checklistId}`);
  },

  createVersion: ({projectId, checklistId, data}) => {
    return send('post', `/api/projects/${projectId}/checklists/${checklistId}/versions`, {
      data: decamelizeKeys(data),
    }).then(flattenResponse);
  },

};

export default ServerAPI;
