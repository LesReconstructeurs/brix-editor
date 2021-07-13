module.exports = function buildChallengeAirtableDataObject({
  id = 'persistant id',
  instruction = 'Les moteurs de recherche affichent certains liens en raison d\'un accord commercial.\n\nDans quels encadrés se trouvent ces liens ?',
  alternativeInstruction = '',
  proposals = '- 1\n- 2\n- 3\n- 4\n- 5',
  type = 'QCM',
  solution = '1, 5',
  solutionToDisplay = '1',
  t1Status = true,
  t2Status = false,
  t3Status = true,
  scoring = '1: @outilsTexte2\n2: @outilsTexte4',
  status = 'validé',
  skillIds = ['recUDrCWD76fp5MsE'],
  timer = 1234,
  competenceId = 'recsvLz0W2ShyfD63',
  embedUrl = 'https://github.io/page/epreuve.html',
  embedTitle = 'Epreuve de selection de dossier',
  embedHeight = 500,
  format = 'mots',
  autoReply = false,
  locales = [],
  focusable = false,
  skills = ['recordId generated by Airtable'],
  genealogy = 'Prototype 1',
  pedagogy = 'q-situation',
  author = ['SPS'],
  declinable = 'facilement',
  preview = 'http://staging.pix.fr/challenges/recwWzTquPlvIl4So/preview',
  version = 1,
  alternativeVersion = 2,
  accessibility1 = 'OK',
  accessibility2 = 'RAS',
  spoil = 'Non Sp',
  responsive = 'non',
  area = 'France',
  airtableId = 'airtable id',
} = {}) {

  return {
    id,
    instruction,
    alternativeInstruction,
    proposals,
    type,
    solution,
    solutionToDisplay,
    t1Status,
    t2Status,
    t3Status,
    scoring,
    status,
    skillIds,
    timer,
    competenceId,
    embedUrl,
    embedTitle,
    embedHeight,
    format,
    autoReply,
    locales,
    focusable,
    airtableId,
    skills,
    genealogy,
    pedagogy,
    author,
    declinable,
    preview,
    version,
    alternativeVersion,
    accessibility1,
    accessibility2,
    spoil,
    responsive,
    area,
  };
};
