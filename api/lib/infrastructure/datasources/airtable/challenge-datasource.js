const datasource = require('./datasource');

module.exports = datasource.extend({

  modelName: 'Challenge',

  tableName: 'Epreuves',

  usedFields: [
    'id persistant',
    'Illustration de la consigne',
    'Pièce jointe',
    'Compétences (via tube) (id persistant)',
    'Timer',
    'Consigne',
    'Propositions',
    'Type d\'épreuve',
    'Bonnes réponses',
    'T1 - Espaces, casse & accents',
    'T2 - Ponctuation',
    'T3 - Distance d\'édition',
    'Scoring',
    'Statut',
    'Acquix (id persistant)',
    'acquis',
    'Embed URL',
    'Embed title',
    'Embed height',
    'Texte alternatif illustration',
    'Format',
  ],

  fromAirTableObject(airtableRecord) {

    let illustrationUrl;
    if (airtableRecord.get('Illustration de la consigne')) {
      illustrationUrl = airtableRecord.get('Illustration de la consigne')[0].url;
    }

    let attachments;
    if (airtableRecord.get('Pièce jointe')) {
      attachments = airtableRecord.get('Pièce jointe').map((attachment) => attachment.url).reverse();
    }

    let competenceId;
    if (airtableRecord.get('Compétences (via tube) (id persistant)')) {
      competenceId = airtableRecord.get('Compétences (via tube) (id persistant)')[0];
    }

    let timer;
    if (airtableRecord.get('Timer')) {
      timer = parseInt(airtableRecord.get('Timer'));
    }

    return {
      id: airtableRecord.get('id persistant'),
      instruction: airtableRecord.get('Consigne'),
      proposals: airtableRecord.get('Propositions'),
      type: airtableRecord.get('Type d\'épreuve'),
      solution: airtableRecord.get('Bonnes réponses'),
      t1Status: airtableRecord.get('T1 - Espaces, casse & accents'),
      t2Status: airtableRecord.get('T2 - Ponctuation'),
      t3Status: airtableRecord.get('T3 - Distance d\'édition'),
      scoring: airtableRecord.get('Scoring'),
      status: airtableRecord.get('Statut'),
      skillIds: airtableRecord.get('Acquix (id persistant)') || [],
      skills: airtableRecord.get('acquis') || [],
      embedUrl: airtableRecord.get('Embed URL'),
      embedTitle: airtableRecord.get('Embed title'),
      embedHeight: airtableRecord.get('Embed height'),
      timer,
      illustrationUrl,
      attachments,
      competenceId,
      illustrationAlt: airtableRecord.get('Texte alternatif illustration'),
      format: airtableRecord.get('Format') || 'mots',
    };
  },
});
