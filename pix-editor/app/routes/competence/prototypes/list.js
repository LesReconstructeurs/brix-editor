import { action } from '@ember/object';
import AuthenticatedRoute from '../../authenticated';
import { inject as service } from '@ember/service';

export default class ListRoute extends AuthenticatedRoute {

  @service router;
  @service store;

  async model(params) {
    const tube = await this.store.findRecord('tube', params.tube_id);
    const skill = await this.store.findRecord('skill', params.skill_id);
    return { skills: tube.filledSkills[skill.level - 1], skill };
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.selectedSkill = model.skill;
    const competenceController = this.controllerFor('competence');
    competenceController.setSection('challenges');
    competenceController.setView('workbench');
    competenceController.maximizeLeft(false);
  }

  @action
  willTransition(transition) {
    if (transition.targetName === 'competence.skills.index') {
      return this.router.transitionTo('competence.skills.single', this.controllerFor('competence').model, this.controllerFor('competence.prototypes.list').selectedSkill);
    } else if (transition.targetName === 'competence.quality.index' && this.controllerFor('competence.prototypes.list').selectedSkill.productionPrototype) {
      return this.router.transitionTo('competence.quality.single', this.controllerFor('competence').model, this.controllerFor('competence.prototypes.list').selectedSkill);
    }
    return true;
  }
}
