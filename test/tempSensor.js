var assert = require('assert');
var TempSensor = require('../tempSensor.js');

describe('TempSensor', function() {
    describe('getTemperature', function() {
        it('should return a random number within +/- .1 of the range', function() {

            var tempSensor = new TempSensor(5,8,0);
            var msg = tempSensor.getTemperature();
            assert.ok(msg.temp > 4.9 && msg.temp < 9.1);

        });
        it('should return status of ok or critical depending if temp is in range', function() {

            var tempSensor = new TempSensor(5,8,0);
            var ok = false, critical = false;
            for(var i = 0; i < 100; i++){
                var msg = tempSensor.getTemperature();
                if(msg.temp > 5 && msg.temp < 8 && msg.status == 'ok') {
                    ok = true;
                }
                if((msg.temp < 5 || msg.temp > 8) && msg.status == 'critical'){
                    critical = true;
                }
            }
            assert.ok(ok);
            assert.ok(critical);

        });
    });
});