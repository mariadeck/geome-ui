const template = require('./project-view.html');

export default {
  template,
  bindings: {
    stats: '<',
    teams: '<',
    test: '<',
    private: '<',
    currentProject: '<',
    currentUser: '<',
  },
};
