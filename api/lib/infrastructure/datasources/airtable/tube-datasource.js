const datasource = require('./datasource');

module.exports = datasource.extend({

  modelName: 'Tube',

  tableName: 'Tubes',

  usedFields: [
    'id persistant',
    'Nom',
    'Titre',
    'Description',
    'Titre pratique',
    'Description pratique',
  ],

  fromAirTableObject(airtableRecord) {
    return {
      id: airtableRecord.get('id persistant'),
      name: airtableRecord.get('Nom'),
      title: airtableRecord.get('Titre'),
      description: airtableRecord.get('Description'),
      practicalTitle: airtableRecord.get('Titre pratique'),
      practicalDescription: airtableRecord.get('Description pratique'),
    };
  },
});