#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var config = require('./config.json');
var gui = require('./gui.js');

(function(){

    var containerTemp = [];

    function update(){
        var tableData = [];

        for(var i = 0; i < Math.floor(containerTemp.length/2); i++){
            var row = [];
            for(var j = 0; j < 2; j++){
                if(i*2+j < containerTemp.length){
                    var text = containerTemp[ i*2+j ].id+': '+containerTemp[ i*2+j ].temp.toFixed(2) + '\u00B0';
                    if(containerTemp[ i*2+j ].status == 'critical'){
                        text = '{red-bg}' +text+ '{/red-bg}';
                    }
                    row[j] = text;
                } 
            }
            tableData.push(row);
        }
        gui.table.setData(tableData);
        gui.screen.render();
    }

    amqp.connect(config.amqp.host, function(err, conn) {
        if (err){
            console.log(err);
            process.exit(1);
        }
        conn.createChannel(function(err, ch) {
            var q = config.amqp.queue;

            ch.assertQueue(q, {durable: false});
            ch.consume(q, function(msg) {

                temp = JSON.parse(msg.content.toString());
                containerTemp[temp.id - 1] = temp;
                update();
            }, {noAck: true});
        });
    });

})()



