require('font-awesome-webpack');
window.$ = require('jquery');

require('./css/html_styles.scss');
require('./css/set_view.scss');
require('./css/element_view.scss');

require('script-loader!./js/i18n');
require('script-loader!./js/event-manager');
require('script-loader!./js/venn');
require('script-loader!./js/utilities');
require('script-loader!./js/attribute');
require('script-loader!./js/viewer/word-cloud');
require('script-loader!./js/viewer/scatterplot');
require('script-loader!./js/viewer/histogram');
require('script-loader!./js/viewer/variant-frequency');
require('script-loader!./js/element-viewer');
require('script-loader!./js/dataLoading');
require('script-loader!./js/filter');
require('script-loader!./js/selection');
require('script-loader!./js/dataStructure');
require('script-loader!./js/ui');
require('script-loader!./js/setSelection');
require('script-loader!./js/sort');
require('script-loader!./js/highlight');
require('script-loader!./js/scrollbar');
require('script-loader!./js/items');
require('script-loader!./js/setGrouping');
require('script-loader!./js/logicPanel');
require('script-loader!./js/brushableScale');
require('script-loader!./js/statisticGraphs');
require('script-loader!./js/upset');

module.exports = {
  UpSet: window.UpSet,
  Ui: window.Ui
};
