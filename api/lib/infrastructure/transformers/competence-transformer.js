const _ = require('lodash');

function filterCompetencesFields(competences) {
  const fieldsToInclude = [
    'id',
    'index',
    'name_i18n',
    'description_i18n',
    'areaId',
    'skillIds',
    'thematicIds',
    'origin',
  ];
  return competences.map((competence) => _.pick(competence, fieldsToInclude));
}

module.exports = {
  filterCompetencesFields,
};
