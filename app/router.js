import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('competence', {path:'/competence/:competence_id'}, function() {
    this.route('challenge', {path:'/challenge/:challenge_id'});
    this.route('skill', {path:'/skill/:skill_id'});
  });
});

export default Router;
