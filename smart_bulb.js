var noble = require('noble');

//class to hold all the logic 
function SmartBulb(noble_bulb_interface, write_characteristic, friendly_name_characteristic)
{
	this.bulb = noble_bulb_interface;
	this.write_characteristic = write_characteristic;
	this.friendly_name_characteristic = friendly_name_characteristic;

	this.brightness_level = 200;
	this.rgb_values = { red: 255, blue: 255, green: 255, hex: 'FFFFFF'};
	this.turned_on = true;

	this.connected = true;
}

//writes data to the smart bulb over BLE
//data must be a Buffer
SmartBulb.prototype.write_data = function(data) {
	this.write_characteristic.write(data, false, function(error) {});

	return { success : 'Data was sent to the bulb.'};
}

//returns true if it is connected to a smart bulb
SmartBulb.prototype.is_connected = function() {
	return this.connected;
}

//keep track of brightness levels
SmartBulb.prototype.set_brightness = function (brightness_level) {
	//validation for brightness levels
	//values range from 0 to 200
	if(brightness_level < 0)
	{
		brightness_level = 0;
	}
	else if(brightness_level > 200)
	{
		brightness_level = 200;
	}

	this.brightness_level = brightness_level;
}

SmartBulb.prototype.set_turned_on_off_status = function (status) {
	this.turned_on = (status == true) ? true : false;
}

SmartBulb.prototype.get_turned_on_off_status = function () {
	return this.turned_on;
}


//keep track of colour values
SmartBulb.prototype.set_colour = function (rgb_values) {
	this.rgb_values = rgb_values;
}

//return brightness levels
SmartBulb.prototype.get_brightness = function () {
	return this.brightness_level;
}

//return colour values
SmartBulb.prototype.get_colour = function () {
	return this.rgb_values;
}

//disconnect function
SmartBulb.prototype.disconnect = function() {
	this.bulb.disconnect();

	this.connected = false;
}




module.exports = SmartBulb;