const template = require('./query-table.html');

const TABLE_COLUMNS = {
  Event: [
    'eventID',
    'locality',
    'decimalLatitude',
    'decimalLongitude',
    'yearCollected',
    'expeditionCode',
    // 'projectCode',
    'bcid',
  ],
  Sample: [
    'materialSampleID',
    'eventID',
    'locality',
    'decimalLatitude',
    'decimalLongitude',
    'yearCollected',
    'phylum',
    'scientificName',
    'expeditionCode',
    'bcid',
  ],
  Tissue: [
    'tissueID',
    'materialSampleID',
    'yearCollected',
    'scientificName',
    'tissueType',
    'tissuePlate',
    'tissueWell',
    'expeditionCode',
    'bcid',
  ],
};

class QueryTableController {
  constructor($window, $state) {
    'ngInject';

    this.$window = $window;
    this.$state = $state;
  }

  $onInit() {
    this.tableColumns = TABLE_COLUMNS.Sample;
    this.tableData = [];
    this.currentPage = 1;
    this.pageSize = 50;
    this.limitOptions = [25, 50, 100];
  }

  $onChanges(changesObj) {
    if ('results' in changesObj) {
      this.currentPage = 1;
    }
    if ('entity' in changesObj) {
      this.tableColumns = TABLE_COLUMNS[this.entity];
    }
  }

  detailView(resource) {
    this.$window.open(
      this.$state.href('record', {
        bcid: resource.bcid,
      }),
    );
  }
}

export default {
  template,
  controller: QueryTableController,
  bindings: {
    results: '<',
    entity: '<',
  },
};
