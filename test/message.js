
var _            = require('underscore')._,
    chai         = require('chai'),
    assert       = chai.assert,
    SMSAPI       = require(__dirname + '/../lib/smsapi.js'),
    config       = require('./config.js'),
    randomString = require('randomstring').generate;

describe('sms', function(){
    var smsapi = new SMSAPI({ server: config.server });

    before(function(done){
        smsapi.authentication.loginHashed(config.username, config.password)
            .then(done.bind(null, null))
            .catch(done);
    });

    describe('sms', function(){
        it('should send sms', function(done){
            smsapi.message
                .sms()
                .from('Info')
                .to(config.testNumber)
                .test()
                .message('Test message')
                .execute()
                .then(function(result){
                    assert.equal(result.count, 1);
                    assert.isArray(result.list);
                    assert.equal(_.first(result.list).number, config.testNumber);
                    assert.property(_.first(result.list), 'points');
                    done();
                })
                .catch(done);
        });

        it('should send test sms with details', function(done){
            smsapi.message
                .sms()
                .from('Info')
                .to(config.testNumber)
                .test()
                .message('Test message')
                .details()
                .execute()
                .then(function(result){
                    assert.equal(result.count, 1);
                    assert.isArray(result.list);
                    assert.equal(_.first(result.list).number, config.testNumber);
                    assert.equal(result.message, 'Test message');
                    assert.property(result, 'length');
                    assert.property(result, 'parts');
                    done();
                })
                .catch(done);
        });

        it('should send sms to array of numbers', function(done){
            smsapi.message
                .sms()
                .from('Info')
                .to([config.testNumber])
                .test()
                .message('Test message')
                .execute()
                .then(function(result){
                    assert.equal(result.count, 1);
                    assert.equal(result.list[0].number, config.testNumber);
                    done();
                })
                .catch(done);
        });

        it('should schedule and remove a sms', function(done){
            var date = new Date();
            date.setHours(date.getHours() + 1);

            smsapi.message
                .sms()
                .from('Info')
                .to(config.testNumber)
                .message('Test message')
                .date(date)
                .dateValidate()
                .execute()
                .then(function(result){
                    assert.property(result, 'count');
                    assert.equal(result.count, 1);
                    assert.isArray(result.list);
                    return _.first(result.list).id;
                })
                .then(function(messageId){
                    return smsapi.message
                        .delete(messageId)
                        .execute();
                })
                .then(function(result){
                    assert.equal(result.count, 1);
                    done();
                })
                .catch(done);
        });
    });

});
