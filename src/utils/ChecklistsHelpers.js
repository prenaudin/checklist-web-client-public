export const getChecklistsByProject = ({ projectId, checklists }) =>
  checklists.filter((checklist) => checklist.get('project') === projectId);
