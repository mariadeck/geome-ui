import { AUTH_ERROR_EVENT } from './services/auth.service';
import { PROJECT_CHANGED_EVENT } from './services/project.service';
import { USER_CHANGED_EVENT } from './services/user.service';
import {
  ProjectViewHookEmitter,
  LOADING_PROJECT_EVENT,
  checkProjectViewPresent,
  STARTED_HOOK_EVENT,
  ENDED_HOOK_EVENT,
} from './projectView.hook';
import { setUser, setProject } from './fims-analytics';

const template = require('./app.html');
// somewhere in the app, I want to insert the idea of workspace. We have 4 options.
// Public Project, user is not member or admin
// Discoverable Project, user is not member or admin
// Public, discoverable, or private project, user is member or admin
// Team selected

// how can we include the idea of "half loaded states"
// like, get the api call going, but continue to load the view. then when the
// data resolves, load the rest of the view.
// the navigation bar, right now, is waiting for the projectView
// the navigation can render just so long as we know whether or not we have a current project
// and what that current projects specs are. does not have to wait until the project data is loaded
// entirely.
// can we go ahead and make a new named viewport, something like "workspace viewport" and inside THAT
// we resolve our all projects data?

class AppCtrl {
  constructor(
    $state,
    $transitions,
    UserService,
    ProjectService,
    AuthService,
    $timeout,
  ) {
    'ngInject';

    this.ProjectService = ProjectService;
    this.UserService = UserService;
    this.AuthService = AuthService;
    this.$state = $state;
    this.$transitions = $transitions;
    this.$timeout = $timeout;
    this.projectView = false;
  }

  $onInit() {
    this.loading = true;
    this.preventReload = false;
    this.showSideNavigation = false;
    this.authCheck();
    this.projectChanged();
    this.userChanged();
    this.showSpinnerOnTransitions();
  }

  authCheck() {
    this.AuthService.on(AUTH_ERROR_EVENT, () => this.signout());
  }

  projectChanged() {
    this.ProjectService.on(PROJECT_CHANGED_EVENT, (p, ignoreReload) => {
      this.currentProject = p;
      this.setUserIsMember();
      if (p) setProject(p.projectId);
      if (
        !ignoreReload &&
        !this.preventReload &&
        !this.$state.current.abstract
      ) {
        this.$state.reload();
      }
    });
  }

  userChanged() {
    this.UserService.on(USER_CHANGED_EVENT, (u, ignoreReload) => {
      this.currentUser = u;
      if (u) {
        this.currentUser.userHasProject = true;
        this.setUserHasProject();
      }
      this.setUserIsMember();
      const { current } = this.$state;
      setUser(u ? u.username : undefined);
      if (
        !ignoreReload &&
        !this.preventReload &&
        !current.abstract &&
        current.name !== 'login'
      ) {
        this.$state.reload();
      }
    });
  }

  showSpinnerOnTransitions() {
    ProjectViewHookEmitter.on(LOADING_PROJECT_EVENT, () => {
      this.loading = true;
    });
    ProjectViewHookEmitter.on(STARTED_HOOK_EVENT, () => {
      this.preventReload = true;
    });
    ProjectViewHookEmitter.on(ENDED_HOOK_EVENT, () => {
      this.preventReload = false;
    });

    this.$transitions.onStart({}, trans => {
      const hasResolvables = s => {
        if (s.showLoading === false) return false;
        if (s.resolvables.length > 0) return true;
        if (!s.parent) return false;
        return hasResolvables(s.parent);
      };

      if (hasResolvables(trans.$to())) this.loading = true;
    });
    this.$transitions.onFinish({}, trans => {
      const err = trans.error();
      if (err && err.message.includes('superseded')) return;
      this.loading = false;
      this.projectView = checkProjectViewPresent(trans.$to());
    });
  }

  setUserHasProject() {
    this.currentUser.userHasProject = this.private.data.length > 0;
  }

  setUserIsMember() {
    if (this.currentProject) {
      if (!this.currentUser) {
        this.currentProject.currentUserIsMember = false;
        return;
      }
      this.currentProject.currentUserIsMember = this.public.data.some(
        p => p.projectId === this.currentProject.projectId,
      );
    }
  }

  handleProjectChange(project) {
    this.loading = true;
    this.ProjectService.setCurrentProject(project);
  }

  signout() {
    this.UserService.setCurrentUser();

    if (this.currentProject && this.currentProject.public === false) {
      this.ProjectService.setCurrentProject();
    }
    this.AuthService.clearTokens();
  }

  toggleSideNav() {
    this.showSideNavigation = !this.showSideNavigation;
  }
}

export default {
  template,
  controller: AppCtrl,
  /*  bindings: {
    private: '<',
    test: '<',
    public: '<',
    teams: '<',
  }, */
};
