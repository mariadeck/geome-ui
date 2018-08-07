/* eslint-disable array-callback-return */
import QueryParams from '../query/QueryParams';

const template = require('./dashboard.html');

class DashboardController {
  constructor(ExpeditionService, DataService, QueryService) {
    'ngInject';

    this.ExpeditionService = ExpeditionService;
    this.DataService = DataService;
    this.QueryService = QueryService;
  }

  $onInit() {
    this.loading = true;
    this.totalItems = null;
    this.itemsPerPage = 100;
    this.currentPage = 1;
    this.results = [];
    this.displayResults = [];
    this.menuCache = {};
  }

  $onChanges(changesObj) {
    if (
      this.currentProject &&
      'currentProject' in changesObj &&
      changesObj.currentProject.previousValue !== this.currentProject
    ) {
      this.fetchPage();
    }
  }

  downloadCsv(conceptAlias, expeditionCode) {
    this.loadingExpedition = expeditionCode;
    this.QueryService.downloadCsv(
      this.getQuery(expeditionCode),
      conceptAlias,
    ).finally(() => (this.loadingExpedition = undefined));
  }

  downloadFasta(conceptAlias, expeditionCode) {
    this.loadingExpedition = expeditionCode;
    this.QueryService.downloadFasta(
      this.getQuery(expeditionCode),
      conceptAlias,
    ).finally(() => (this.loadingExpedition = undefined));
  }

  getQuery(expeditionCode) {
    const params = new QueryParams();
    params.expeditions.push({ expeditionCode });
    return params.buildQuery(this.currentProject.projectId);
  }

  downloadFastq(expeditionCode) {
    this.loadingExpedition = expeditionCode;
    this.DataService.generateSraData(
      this.currentProject.projectId,
      expeditionCode,
    ).finally(() => (this.loadingExpedition = undefined));
  }

  menuOptions(expedition) {
    if (!this.menuCache[expedition.expeditionCode]) {
      this.menuCache[expedition.expeditionCode] = this.headers
        .map(header => {
          const conceptAlias = header.replace('Count', '');
          const entity = this.currentProject.config.entities.find(
            e => e.conceptAlias === conceptAlias,
          );

          // if count is 0
          if (!Number(expedition[header])) return;

          if (entity.worksheet) {
            // eslint-disable-next-line consistent-return
            return {
              fn: this.downloadCsv.bind(this, conceptAlias),
              name: `${conceptAlias} CSV`,
            };
          } else if (entity.type === 'Fasta') {
            // eslint-disable-next-line consistent-return
            return {
              fn: this.downloadFasta.bind(this, conceptAlias),
              name: 'Fasta',
            };
          } else if (entity.type === 'Fastq') {
            // eslint-disable-next-line consistent-return
            return {
              fn: this.downloadFastq.bind(this),
              name: 'Fastq',
            };
          }
        })
        .filter(o => o !== undefined);
    }
    return this.menuCache[expedition.expeditionCode];
  }
  // eslint-disable-next-line class-methods-use-this
  humanReadableHeader(val) {
    return val
      .replace('Count', '') // remove 'Count' suffix
      .replace(/([A-Z])/g, match => ` ${match}`) // split on camelCase
      .replace(/^./, match => match.toUpperCase()) // uppercase each word
      .trim()
      .replace(
        /\w$/,
        match => (match === 's' || match === 'a' ? match : `${match}s`),
      ); // end w/ 's'
  }

  pageChanged() {
    // each object in the result contains the expedition info,
    // as well as the 1 {entity}Count value for each entity
    // our table headers are these count values
    this.headers = Object.keys(this.results[0]).filter(k =>
      k.endsWith('Count'),
    );
    this.displayResults = this.results.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage,
    );
  }

  fetchPage() {
    this.ExpeditionService.stats(this.currentProject.projectId)
      .then(({ data }) => {
        Object.assign(this.results, data);
        this.pageChanged();
        this.totalItems = this.results.length;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}

export default {
  template,
  controller: DashboardController,
  bindings: {
    currentUser: '<',
    currentProject: '<',
  },
};