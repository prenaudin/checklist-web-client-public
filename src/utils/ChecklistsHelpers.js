export default {

  getChecklistsByProject: ({projectId, checklists}) => {
    return checklists.filter((checklist) => {
      return checklist.get('project') === projectId;
    });
  },

  getTestsOKCount: (checklist) => {
    return 3;
  },

  getTestsNOKCount: (checklist) => {
    return 2;
  },

  getTestsPendingCount: (checklist) => {
    return 5;
  }

};
