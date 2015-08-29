
var _                     = require('underscore'),
    ActionFactoryAbstract = require('./action-factory-abstract.js'),
    MessageSms            = require('./message-sms.js'),
    MessageDelete         = require('./message-delete.js');

function Message(options){
    ActionFactoryAbstract.call(this, options);
}

Message.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * @return {MessageSms}
 */
Message.prototype.sms = function(){
    return this.createAction(MessageSms);
};

/**
 * @return {MessageDelete}
 */
Message.prototype.delete = function(id){
    return this.createAction(MessageDelete, id);
};

module.exports = Message;
