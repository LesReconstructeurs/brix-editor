import { Factory } from 'miragejs';

export default Factory.extend({

  instruction: 'instructions',
  type: 'QCU',
  format: 'format',
  proposals: 'suggestion',
  solution: 'answers',
  t1Status: 't1',
  t2Status: 't2',
  t3Status: 't3',
  pedagogy: 'pedagogy',
  author() { return ['author']; },
  declinable: 'declinable',
  version: 'version',
  genealogy: 'Prototype 1',
  status: 'validé',
  preview: 'preview',
  airtableId: undefined,
  timer: 'timer',
  embedURL: 'embedURL',
  embedTitle: 'embedTitle',
  embedHeight: 'embedHeight',
  alternativeVersion: 'alternativeVersion',
  accessibility1: 'accessibility1',
  accessibility2: 'accessibility2',
  spoil: 'spoil',
  responsive: 'responsive',
  locales: 'languages',
  area: 'area',
  autoReply: 'autoReply',
  files: null,
  updatedAt: '2021-10-02T14:00:00.000Z'
});

