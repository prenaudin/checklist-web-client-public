/* Last version counters */
const getVersionCount = (version, status) => {
  if (!version) { return 0; }
  const tests = version.get('tests');
  return tests.reduce((memo, test) => {
    switch (test.get('status')) {
      case status:
        return memo + 1;
      default:
        return memo;
    }
  }, 0);
};

export const getVersionOKCount = (version) => {
  return getVersionCount(version, 'ok');
};

export const getVersionNOKCount = (version) => {
  return getVersionCount(version, 'nok');
};

export const getVersionPendingCount = (version) => {
  return getVersionCount(version, 'pending');
};
