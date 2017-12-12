class DataService {
  constructor($q, $http, ProjectService, FileService, alerts, exception, REST_ROOT) {
    this.q = $q;
    this.http = $http;
    this.projectService = ProjectService;
    this.fileService = FileService;
    this.alerts = alerts;
    this.exception = exception;
    this.REST_ROOT = REST_ROOT;
  }

  exportData(expeditionCode) {
    let projectId = this.projectService.currentProject.projectId;

    if (!projectId) {
      return this.q.reject({ data: { error: "No project is selected" } });
    }

    return this.http.get(this.REST_ROOT + 'data/export/' + projectId + '/' + expeditionCode)
      .then(function (response) {
          if (response.status === 204) {
            this.alerts.info("No resources found");
            return
          }
          return this.fileService.download(response.data.url)
        },
        this.exception.catcher("Failed to export data"),
      );
  }
}

DataService.$inject = [ '$q', '$http', 'ProjectService', 'FileService', 'alerts', 'exception', 'REST_ROOT' ];
export default DataService;