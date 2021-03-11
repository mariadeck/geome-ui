import { EventEmitter } from 'events';
import { executeIfTransitionValid, isTransitionValid } from './utils/router';
import { checkProjectRequired } from './views/project/projectRequired.hook';

export const STARTED_HOOK_EVENT = 'started_hook';
export const ENDED_HOOK_EVENT = 'ended_hook';
export const LOADING_PROJECT_EVENT = 'loading_project';
export const FINISHED_LOADING_PROJECT_EVENT = 'finished_loading_project';

export function checkProjectViewPresent(state) {
  let s = state;

  do {
    if (s.name === 'projectView') {
      return true;
    }
    s = s.parent;
  } while (s);

  return false;
}
// eventemitter is a little hack to communicate between componenets
// that aren't wired together
// you could probably use angulars native watcher to check rootscope
// you can subscribe and emit events
// you have to subscirbe a component to the event emiiter
// for the component to see the change being emitted

// the user object is getting reset in a hook, that hook runs when you reload the page
// that isnt getting triggered when you do it the other way
// when you click create project, it loads the page, the project gets selected
// this has to do with some caching in the project service
// the project service emits a call that gets cached
// we tell it to ignore the cache
// somewhere in the app theres a
// set a debug function
// set a breakpoint and watch the chrome console
// as part of the reload angular makes another call
// to project service.getProjectsForUser
// that call (getProjectsForUser)
// why does the angularreload not reload everything?
// becasue its an internal reload
// not a browser reload
// its not reload all the initial services
// the angularreload is just an internal reload
// or just the data inside the app.

export const ProjectViewHookEmitter = new EventEmitter();

export default (
  $rootScope,
  $location,
  $transitions,
  $mdDialog,
  ProjectService,
  UserService,
) => {
  'ngInject';

  // re-route to dashboard for Project View states if no project is selected
  $transitions.onBefore(
    { to: s => checkProjectViewPresent(s) && checkProjectRequired(s) },
    async trans => {
      const projectId = parseInt($location.search().projectId, 10);
      if (
        ProjectService.currentProject() &&
        (!projectId || ProjectService.currentProject().projectId === projectId)
      ) {
        return Promise.resolve();
      }

      // we set up this function checking that transition
      // is valid but if the hook event finished
      // this just stops the watch
      // stop the watcher when the transition ends
      // read about what the watch function is actually
      // you only have to replace
      const unWatch = $rootScope.$watch(
        () => isTransitionValid(trans, $transitions),
        valid => {
          if (!valid) {
            $mdDialog.hide();
            unWatch();
          }
        },
      );

      ProjectViewHookEmitter.emit(STARTED_HOOK_EVENT);
      trans.onFinish(
        {},
        () => {
          ProjectViewHookEmitter.emit(ENDED_HOOK_EVENT);
          unWatch();
        },
        { invokeLimit: 1 },
      );

      const setProject = project => {
        ProjectViewHookEmitter.emit(LOADING_PROJECT_EVENT);
        return executeIfTransitionValid(trans, $transitions, () =>
          ProjectService.setCurrentProject(project).then(() => {
            ProjectViewHookEmitter.emit(FINISHED_LOADING_PROJECT_EVENT);
          }),
        );
      };

      if (projectId) {
        try {
          const project = await ProjectService.get(projectId, false);
          if (project) return setProject(project);
        } catch (e) {}
      }
      const currentUser = UserService.currentUser();
      const isAuthenticated = !!currentUser;

      // if there is only a single project the currentUser is a member, auto-select that project
      // project loads are cached so we don't fetch 2x if there are multiple projects
      try {
        const res = await ProjectService.all(!isAuthenticated);
        if (res.data.length === 1) return setProject(res.data[0]);
      } catch (e) {}

      const { stateService } = trans.router;
      return stateService.target('dashboard');
    },
    { priority: 50 },
  );
};
