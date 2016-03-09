import {flattenResponse, decamelizeKeys} from '../utils/APIHelpers';
import configApi from '../config/api';

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

const send = (method, url, body) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'client': clientToken,
    'access-token': accessToken,
    'uid': uidToken,
    'token-type': 'Bearer',
  });

  return window.fetch(configApi.endpoint + url, {
    method: method,
    body: JSON.stringify(body),
    headers: headers,
    mode: 'no-cors',
  }).then((response) => {
    if (!response.ok) {
      throw response;
    }

    setTokens({
      accessToken: response.headers.get('access-token'),
      clientToken: response.headers.get('client'),
      uidToken: response.headers.get('uid'),
    });

    return response.json();
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
    return send('post', '/api/projects', {data}).then(flattenResponse);
  },

  findAllProjects: () => {
    return send('get', '/api/projects?include=checklists,user').then(flattenResponse);
  },

  findProject: (projectId) => {
    return send('get', `/api/projects/${projectId}?include=checklists,user`).then(flattenResponse);
  },

  createChecklist: ({data}) => {
    return send('post', `/api/projects/${data.project}/checklists`, {
      data: decamelizeKeys(data),
    }).then(flattenResponse);
  },

  findChecklist: ({projectId, checklistId}) => {
    return send('get', `/api/projects/${projectId}/checklists/${checklistId}?include=project`)
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
