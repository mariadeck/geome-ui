import { times } from 'lodash';
// if I go to query, (no project selected), then go to dashboard, this component gets inited
// twice

const template = require('./dashboard.html');

class DashboardController {
  constructor($timeout, ProjectConfigurationService) {
    'ngInject';

    this.$timeout = $timeout;
    this.ProjectConfigurationService = ProjectConfigurationService;
  }

  $onInit() {
    this.modelArr = ['yip', 'yup', 'yope', 'dope'];
    this.entitiesLoaded = false;
    this.modifyTeamsArray();
    this.getTeamConfigs();
    // need ot find a way to make sure that the http calls for all projects are finished in the app
    // contorllelr befoer this component is initaited
    this.createPublicTable();
    this.createPrivateTable();
    this.filterPublicData(); // filter out projects already listed under 'My Projects'
  }
  // the stats and privateProjects objects are only being loaded if theyre first loaded
  // into antoher ProjectView child state. the issue here being that perhaps the app needs more time to laod?
  // try putting a timeout funciton into this onINit to see if its a timeing issue
  // def a timing issue. see if you can put an await function on the app.component loading the data
  // or used the FINISHED LOADING PROJECT EVENT or something from the app.componentn.js
  // this state should NOT be initialized until the abstract root state of projectView is finished
  // so WHY is this happening? (only on this state, too)
  modifyTeamsArray() {
    this.teams.push({ name: 'Non-network Configurations' }, { name: 'All' });
  }

  getTeamConfigs() {
    this.assigningConfigs = true;
    this.teams.forEach(t => {
      if (t.id) {
        this.ProjectConfigurationService.get(t.id)
          .then(config => Object.assign(t, config))
          .finally(() => {
            this.entitiesLoaded = true;
          });
      }
    });
  }

  click(workspace) {
    console.log(workspace);
    // projectSErvice.setWorkspace(workspace).then(()=>
    // this.$state.go('overview'))
  }

  mouseover(team) {
    if (team.name === 'All') this.mouseoveredProjects = this.filteredPublicData;
    else if (team.name === 'Non-network Configurations') {
      this.mouseoveredProjects = this.filteredPublicData.filter(
        p => p.projectConfiguration.networkApproved !== true,
      );
    } else
      this.mouseoveredProjects = this.filteredPublicData.filter(
        p => p.projectConfiguration.name === team.name,
      );
  }

  createPublicTable() {
    this.publicData = [];
    this.stats.data.forEach(p => {
      Object.assign(p, {
        hasPhotos:
          p.entityStats.Sample_PhotoCount > 0 ||
          p.entityStats.Event_PhotoCount > 0,
        hasSRA: p.entityStats.fastqMetadataCount > 0,
      });
      this.publicData.push(p);
    });
  }

  createPrivateTable() {
    this.privateData = [];
    this.private.data.forEach(p => {
      const el = this.stats.data.find(s => s.projectTitle === p.projectTitle);
      Object.assign(el, {
        hasPhotos:
          el.entityStats.Sample_PhotoCount > 0 ||
          el.entityStats.Event_PhotoCount > 0,
        hasSRA: el.entityStats.fastqMetadataCount > 0,
      });
      this.privateData.push(el);
    });
  }

  filterPublicData() {
    this.filteredPublicData = this.publicData.filter(
      p => !this.privateData.includes(p),
    );
  }
}

export default {
  template,
  controller: DashboardController,
  bindings: {
    currentUser: '<',
    currentProject: '<',
    stats: '<',
    teams: '<',
    test: '<',
    private: '<',
  },
};
