

tempSensor = function(min,max,id){
	this.max = max;
	this.min = min;
	this.id = id;
}

tempSensor.prototype.getTemperature = function(){
	var temp = (Math.random() * (this.max - this.min + .2)) + (this.min - .1);//generate a random number +/- 1 the max and min
	var status = 'ok';

	if(temp < this.min || temp > this.max){
		status = 'critical';
	}
	return {
		temp:temp,
		status:status,
		id:this.id
	};
}

module.exports = tempSensor;