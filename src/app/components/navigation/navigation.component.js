/* Ideas: have workspace 'conditions:'
1. Team Selected
2. Public project selected
3. Private project selected
4 Discoverable
If NONE of these are selected, then we need to hook it:
re-direct to 'dashboard' view/ project selector
 */

const template = require('./navigation.html');

class NavigationController {
  constructor($state, ExpeditionService, $mdMedia) {
    'ngInject';

    this.$state = $state;
    this.$mdMedia = $mdMedia;
    this.ExpeditionService = ExpeditionService;
  }

  $onChanges() {
    if (!this.currentProject || this.currentProject.limitedAccess) {
      return;
    }

    this.showProjectConfig =
      this.currentUser &&
      this.currentProject &&
      this.currentProject.projectConfiguration.user.userId ===
        this.currentUser.userId;

    this.showPhotoUpload =
      this.currentUser &&
      this.currentProject &&
      this.currentProject.config.entities.some(e => e.type === 'Photo');

    this.showPlateViewer =
      this.currentProject &&
      this.currentProject.config.entities.some(
        e => e.conceptAlias === 'Tissue' && e.uniqueKey === 'tissueID',
      );

    this.showTeamOverview =
      this.currentProject &&
      this.currentProject.projectConfiguration.networkApproved === true;

    this.showSRAUpload =
      this.currentUser &&
      this.currentProject &&
      this.currentProject.config.entities.some(e => e.type === 'Fastq');
  }
}

export default {
  template,
  controller: NavigationController,
  bindings: {
    currentUser: '<',
    currentProject: '<',
    showSideNavigation: '<',
  },
};
