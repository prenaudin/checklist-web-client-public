export const getVersionsByChecklist = ({ checklistId, versions }) =>
  versions.filter((version) => version.get('checklist') === checklistId);
