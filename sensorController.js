#!/usr/bin/env node
var TempSensor = require('./tempSensor.js');
var amqp = require('amqplib/callback_api');
var config = require('./config.json');



(function(){

	var tempSensors = [];
	var index = 0;

	config.containers.forEach(function(container,i){
		tempSensors.push(new TempSensor(container.min, container.max, container.id))
	});

	function heartbeat(channel,queue){
		tempSensors.forEach(function(tempSensor){
			var msg = JSON.stringify(tempSensor.getTemperature());
			channel.sendToQueue(queue, new Buffer(msg));
		});
	}

	amqp.connect(config.amqp.host, function(err, conn) {
		if (err){
            console.log(err);
            process.exit(1);
        }
		conn.createChannel(function(err, ch) {
	    	var q = config.amqp.queue;
	    	console.log('Sending messages to queue, press Ctrl-C to quit')
	    	ch.assertQueue(q, {durable: false});
	    	// Note: on Node 6 Buffer.from(msg) should be used
	    	//ch.sendToQueue(q, new Buffer(msg));
	    	var interval = setInterval(function() { heartbeat(ch,q); }, 1000);
	    	//console.log(" [x] Sent %s", msg);
	  });
	  
	});
})()