
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

function PointsGet(options){
    ActionAbstract.call(this, options);
}

PointsGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * @return {Promise}
 */
PointsGet.prototype.execute = function(){
    this.param('credits', 1); // force param

    return this.request()
        .path('user.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = PointsGet;
