const nock = require('nock');
const { expect, databaseBuilder, domainBuilder, generateAuthorizationHeader, airtableBuilder } = require('../../test-helper');
const createServer = require('../../../server');

describe('Acceptance | Controller | airtable-proxy-controller-refresh-cache', () => {

  describe('POST /api/airtable/content/Competences', () => {
    const competenceDataObject = domainBuilder.buildCompetenceAirtableDataObject({ id: 'recCompetence' });
    const competence = airtableBuilder.factory.buildCompetence({
      id: 'recCompetence',
      areaId: [competenceDataObject.areaId],
      description: competenceDataObject.description,
      descriptionFrFr: competenceDataObject.descriptionFrFr,
      descriptionEnUs: competenceDataObject.descriptionEnUs,
      index: competenceDataObject.index,
      skillIds: competenceDataObject.skillIds,
      name: competenceDataObject.name,
      nameFrFr: competenceDataObject.nameFrFr,
      nameEnUs: competenceDataObject.nameEnUs,
      origin: competenceDataObject.origin,
    });
    const token = 'dummy-pix-api-token';

    let user;
    beforeEach(async function() {
      user = databaseBuilder.factory.buildUser({ name: 'User', trigram: 'ABC', access: 'admin', apiKey: '11b2cab8-050e-4165-8064-29a1e58d8997' });
      await databaseBuilder.commit();

    });
    afterEach(function() {
      nock.cleanAll();
    });

    it('should refresh cache of updated record in pix api', async () => {
      // Given
      nock('https://api.test.pix.fr')
        .post('/api/token', { username: 'adminUser', password: '123' })
        .matchHeader('Content-Type', 'application/x-www-form-urlencoded')
        .reply(200, { 'access_token': token });

      const apiCacheScope = nock('https://api.test.pix.fr')
        .patch('/api/cache/competences/recCompetence', competenceDataObject)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      nock('https://api.airtable.com')
        .post('/v0/airtableBaseValue/Competences', competence)
        .matchHeader('authorization', 'Bearer airtableApiKeyValue')
        .reply(200, competence);
      const server = await createServer();

      // When
      const response = await server.inject({
        method: 'POST',
        url: '/api/airtable/content/Competences',
        headers: generateAuthorizationHeader(user),
        payload: competence,
      });

      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.deep.equal(competence);
      apiCacheScope.done();
    });

    it('should return 200 when refresh cache fails', async () => {
      // Given
      nock('https://api.test.pix.fr')
        .post('/api/token', { username: 'adminUser', password: '123' })
        .matchHeader('Content-Type', 'application/x-www-form-urlencoded')
        .reply(200, { 'access_token': token });

      const apiCacheScope = nock('https://api.test.pix.fr')
        .patch('/api/cache/competences/recCompetence', competenceDataObject)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(400);

      nock('https://api.airtable.com')
        .post('/v0/airtableBaseValue/Competences', competence)
        .matchHeader('authorization', 'Bearer airtableApiKeyValue')
        .reply(200, competence);
      const server = await createServer();

      // When
      const response = await server.inject({
        method: 'POST',
        url: '/api/airtable/content/Competences',
        headers: generateAuthorizationHeader(user),
        payload: competence,
      });

      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.deep.equal(competence);
      apiCacheScope.done();
    });

    it('should return 200 when Pix API authentication fails', async () => {
      // Given
      const apiTokenScope = nock('https://api.test.pix.fr')
        .post('/api/token', { username: 'adminUser', password: '123' })
        .matchHeader('Content-Type', 'application/x-www-form-urlencoded')
        .reply(400);

      nock('https://api.airtable.com')
        .post('/v0/airtableBaseValue/Competences', competence)
        .matchHeader('authorization', 'Bearer airtableApiKeyValue')
        .reply(200, competence);
      const server = await createServer();

      // When
      const response = await server.inject({
        method: 'POST',
        url: '/api/airtable/content/Competences',
        headers: generateAuthorizationHeader(user),
        payload: competence,
      });

      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.deep.equal(competence);
      apiTokenScope.done();
    });
  });

  describe('POST /api/airtable/content/Epreuves', () => {
    const challengeDataObject = domainBuilder.buildChallenge({ id: 'recChallenge' });
    const expectedChallenge = {
      id: 'recChallenge',
      instruction: challengeDataObject.instruction,
      alternativeInstruction: challengeDataObject.alternativeInstruction,
      proposals: challengeDataObject.proposals,
      type: challengeDataObject.type,
      solution: challengeDataObject.solution,
      solutionToDisplay: challengeDataObject.solutionToDisplay,
      t1Status: challengeDataObject.t1Status,
      t2Status: challengeDataObject.t2Status,
      t3Status: challengeDataObject.t3Status,
      scoring: challengeDataObject.scoring,
      status: challengeDataObject.status,
      skillIds: challengeDataObject.skillIds,
      timer: challengeDataObject.timer,
      competenceId: challengeDataObject.competenceId,
      embedUrl: challengeDataObject.embedUrl,
      embedTitle: challengeDataObject.embedTitle,
      embedHeight: challengeDataObject.embedHeight,
      format: challengeDataObject.format,
      autoReply: challengeDataObject.autoReply,
      locales: challengeDataObject.locales,
      focusable: challengeDataObject.focusable,
    };
    const challenge = airtableBuilder.factory.buildChallenge({
      ...expectedChallenge,
      airtableId: 'toto',
      skills: ['recordId generated by airtable'],
      genealogy: 'Prototype 1',
      pedagogy: 'q-situation',
      author: ['SPS'],
      declinable: '',
      preview: '',
      version: '',
      alternativeVersion: '',
      accessibility1: '',
      accessibility2: '',
      spoil: '',
      responsive: '',
      area: '',
    });
    const attachment = airtableBuilder.factory.buildAttachment({
      id: '1',
      type: 'illustration',
      url: 'http://example.com/my-illustration',
      alt: 'my alt',
      challengeId: 'recChallenge'
    });
    const token = 'dummy-pix-api-token';

    let user;
    beforeEach(async function() {
      user = databaseBuilder.factory.buildUser({ name: 'User', trigram: 'ABC', access: 'admin', apiKey: '11b2cab8-050e-4165-8064-29a1e58d8997' });
      await databaseBuilder.commit();

    });
    afterEach(function() {
      nock.cleanAll();
    });

    it('should refresh cache of updated record in pix api', async () => {
      // Given
      const expectedChallengePayload = {
        ...expectedChallenge,
        illustrationUrl: 'http://example.com/my-illustration',
        illustrationAlt: 'my alt',
      };

      nock('https://api.airtable.com')
        .post('/v0/airtableBaseValue/Epreuves', challenge)
        .matchHeader('authorization', 'Bearer airtableApiKeyValue')
        .reply(200, challenge);

      const attachmentsScope = nock('https://api.airtable.com')
        .get('/v0/airtableBaseValue/Attachments')
        .query({ filterByFormula: '{challengeId persistant} = \'recChallenge\'' })
        .matchHeader('authorization', 'Bearer airtableApiKeyValue')
        .reply(200, { records: [attachment] });

      nock('https://api.test.pix.fr')
        .post('/api/token', { username: 'adminUser', password: '123' })
        .matchHeader('Content-Type', 'application/x-www-form-urlencoded')
        .reply(200, { 'access_token': token });

      const apiCacheScope = nock('https://api.test.pix.fr')
        .patch('/api/cache/challenges/recChallenge', expectedChallengePayload)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      const server = await createServer();

      // When
      const response = await server.inject({
        method: 'POST',
        url: '/api/airtable/content/Epreuves',
        headers: generateAuthorizationHeader(user),
        payload: challenge,
      });

      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.deep.equal(challenge);
      attachmentsScope.done();
      apiCacheScope.done();
    });
  });

});
