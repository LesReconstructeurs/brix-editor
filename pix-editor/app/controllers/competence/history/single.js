import Controller from '@ember/controller';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as controller } from '@ember/controller';

export default class CompetenceHistorySingleController extends Controller {

  @controller('competence')
  parentController;

  @alias('parentController.leftMaximized')
  isMaximized;

  @action
  maximize() {
    this.parentController.maximizeLeft(true);
  }

  @action
  minimize() {
    this.parentController.maximizeLeft(false);
  }

  @action
  close() {
    this.parentController.send('closeChildComponent');
  }

}
