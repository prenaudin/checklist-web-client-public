export const getChecklistsByProject = ({projectId, checklists}) => {
  return checklists.filter((checklist) => {
    return checklist.get('project') === projectId;
  });
};
