var amqp = require('amqplib/callback_api');
var assert = require('assert');
var config = require('../config.json');

require('../sensorController.js');

describe('sensorController.js', function(){
	var q = config.amqp.queue;
	var channel;
	before(function(done) {
		
    	amqp.connect(config.amqp.host, function(err, conn) {
			conn.createChannel(function(err, ch) {
				ch.assertQueue(q, {durable: false});
		    	channel = ch;
		    	done();
			});
		});
  	});
	describe('sending message', function(){
		it('should send a message', function(done){
			received = false;
		    channel.consume(q, function(msg) {
		    	if(!received){
			    	channel.cancel(msg.fields.consumerTag, done);
			    	assert.ok(true);
		    	}
		    	received = true;
		    }, {noAck: true});
		    
			
		});
		it('should send another message with temperature object', function(done){
			
			received = false;
		    channel.consume(q, function(msg) {
		    	if(!received){
		    		channel.cancel(msg.fields.consumerTag, done);
			    	msg = JSON.parse(msg.content.toString());
			    	assert.ok(msg.hasOwnProperty('temp'));
			    	assert.ok(msg.hasOwnProperty('status'));
			    	assert.ok(msg.hasOwnProperty('id'));
		    	}
		    	received = true;
		    }, {noAck: true});
				
			
		});
		it('should send messages for config.containers.length different teperature sensors', function(done){
			this.timeout(20000)
			var results = [];
			var count = 0;

			channel.consume(q, function(msg) {
				var temp = JSON.parse(msg.content.toString());
		    	if(results.indexOf(temp.id) == -1){
		    		results.push(temp.id);
		    	}
		    	count++;
		    	if(count == config.containers.length * 2){
		    		channel.cancel(msg.fields.consumerTag,done);
		    		assert.ok(results.length == config.containers.length);
		    	}
		    	

		    }, {noAck: true});
		});
	});
});