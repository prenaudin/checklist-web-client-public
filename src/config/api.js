let endpoint;

switch (process.env.NODE_ENV) {
  case 'development':
    endpoint = 'http://localhost:5000';
    break;
  case 'test':
    endpoint = 'https://test.checklist.run';
    break;
  default:
    endpoint = 'https://checklist-web-api.herokuapp.com';
}

export default { endpoint };
