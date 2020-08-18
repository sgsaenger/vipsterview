var vp_widget = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
    id: 'vipster-js-widget',
    requires: [base.IJupyterWidgetRegistry],
    activate: function(app, widgets){
        widgets.registerWidget({
            name: 'vipster-js-widget',
            version: '0.1.1',
            exports: {'VipsterView': vp_widget.VipsterView}
        });
    },
    autoStart: true
};
