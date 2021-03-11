function getStates() {
  return [
    {
      state: 'projectView',
      config: {
        url: '/workbench',
        abstract: true,
        projectRequired: true,
        component: 'fimsProjectView',
        resolve: {
          stats: /* @ngInject */ ProjectService => ProjectService.stats(),
          private: /* @ngInject */ ProjectService => ProjectService.all(),
          public: /* @ngInject */ ProjectService => ProjectService.all(true),
          teams: /* @ngInject */ ProjectConfigurationService =>
            ProjectConfigurationService.all(true),
        },
      },
    },
    {
      state: 'containerPageView',
      config: {
        component: 'fimsContainerPage',
        abstract: true,
        resolve: {
          layout: () => 'row',
        },
      },
    },
  ];
}

export default routerHelper => {
  'ngInject';

  routerHelper.configureStates(getStates());
};
