const _ = require('lodash');

function filterSkillsFields(skills) {
  const fieldsToInclude = [
    'id',
    'name',
    'hintFrFr',
    'hintEnUs',
    'hintStatus',
    'tutorialIds',
    'learningMoreTutorialIds',
    'competenceId',
    'pixValue',
    'status',
    'tubeId',
  ];
  return skills.map((skill) => _.pick(skill, fieldsToInclude));
}

module.exports = {
  filterSkillsFields
};