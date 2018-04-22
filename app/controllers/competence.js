import Controller from "@ember/controller";
import {computed, observer} from "@ember/object";
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { alias } from "@ember/object/computed";

export default Controller.extend({
  challengeCount:0,
  childComponentMaximized:false,
  skillMode:false,
  listView:false,
  router:service(),
  application:controller(),
  currentChallenge:null,
  currentSkill:null,
  competence:alias("model"),
  challenges:alias("model.challenges"),
  init() {
    this._super(...arguments);
    this.listColumns = [{
      title:"Acquis",
      propertyName:"skills"
    },{
      title:"Consigne",
      propertyName:"instructions"
    },{
      title:"Type",
      propertyName: "type"
    },{
      title:"Statut",
      propertyName: "status"
    }
  ];
  },
  competenceHidden:computed("childComponentMaximized", function() {
    return this.get("childComponentMaximized")?"hidden":"";
  }),
  childComponentAdapter:observer("skillMode", function() {
    let skillMode = this.get("skillMode");
    let currentRoute = this.get("router.currentRouteName");
    if (skillMode) {
      this.set("listView", false);
    }
    if (skillMode && currentRoute.startsWith("competence.challenge")) {
      /*let challenge = this.get("currentChallenge");
      let skillNames = challenge.get("skillNames")
      if (skills.length>0) {
        let skill = skills.get("firstObject");
        console.debug(skill);
        this.transitionToRoute("competence.skill", this.get("competence").get("id"), skill.get("id"));
      }*/
      //TODO: link to correct skill
      this.transitionToRoute("competence.index",  this.get("competence").get("id"));
    } else if (!skillMode && currentRoute.startsWith("competence.skill")) {
      /*let skill = this.get("currentSkill");
      let template = skill.get("template");
      if (template) {
        console.log("id");
        console.debug(template.get("id"));
        this.transitionToRoute("competence.challenge", this.get("competence").get("id"), template.get("id"));
      } else {
        this.transitionToRoute("competence.index",  this.get("competence").get("id"));
      }*/
      //TODO: link to correct challenge
      this.transitionToRoute("competence.index",  this.get("competence").get("id"));
    }
  }),
  size:computed("router.currentRouteName", function() {
    if (this.get("router.currentRouteName") == 'competence.index') {
      return "full";
    } else {
      return "half";
    }
  }),
  twoColumns:computed("router.currentRouteName", function() {
    let routeName = this.get("router.currentRouteName");
    switch (routeName) {
      case "competence.challenge.alternatives":
      case "competence.challenge.alternatives.index":
      case "competence.challenge.alternatives.alternative":
      case "competence.challenge.alternatives.new-alternative":
        return true;
      default:
        return false;
    }
  }),
  actions: {
    maximizeChildComponent() {
      this.set("childComponentMaximized", true);
    },
    minimizeChildComponent() {
      this.set("childComponentMaximized", false);
    },
    closeChildComponent(refresh) {
      this.set("childComponentMaximized", false);
      this.transitionToRoute("competence", this.get("competence").get("id"));
      if (refresh) {
        this.send("refreshModel");
      }
    },
    refresh() {
      this.send("closeChildComponent", true);
    },
    setListView() {
      this.set("listView", true);
    },
    setGridView() {
      this.set("listView", false);
    },
    newChallenge() {
      this.transitionToRoute("competence.new-template", this.get("competence"));
    },
    copyChallenge(challengeId) {
      this.transitionToRoute("competence.new-template", this.get("competence"), { queryParams: { from: challengeId}});
    },
    soon() {
      this.get("application").send("showMessage", "Bientôt disponible...", true);
    },
    addChallenge(challenge) {
      this.get("challenges").addObject(challenge);
      this.set("challengeCount", this.get("challengeCount")+1);
    },
    removeChallenge(challenge) {
      let challenges = this.get("challenges");
      if (challenges.includes(challenge)) {
        challenges.removeObject(challenge);
        this.set("challengeCount", this.get("challengeCount")-1);
      }
    },
    showAlternatives(challenge) {
      this.transitionToRoute("competence.challenge.alternatives", this.get("competence"), challenge);
    }
  }
});
