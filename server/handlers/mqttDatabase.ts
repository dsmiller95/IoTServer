import { connectionObj, mqttServers } from '../config';


var mysql = require('mysql');
function getConnection(){
	return mysql.createConnection(connectionObj);
}

const mqtt = require('mqtt')  ;


class mqttInit{
	constructor(){
		const client = mqtt.connect({servers: mqttServers});

		var garageState = ''  
		var connected = false

		client.on('connect', () => {  
		  client.subscribe('/info/temp');
		  console.log("connected to mqtt");
		});

		client.on('message', (topic, message) => {
			if(topic === '/info/temp') {

				console.log(message.toString());
				try{
					var obj = JSON.parse(message.toString());
				}catch(exception){
					console.log("Error parsing mqtt message:");
					console.log(topic, message.toString());
					console.log(exception);
					return;
				}

				if(!('temp' in obj) || obj.temp == undefined || obj.temp == null){
					console.warn("malformed temp data");
					console.warn(obj);
					client.publish('/info/reporting', "Malformed temperature data: " + message.toString());
					return;
				}
				if(!(obj.time)){
					//if no time provided, assume current time
					obj.time = (new Date()).getTime();
				}
				if(obj.time < 0){
					//if time is negative, assume relative to current time
					obj.time = (new Date()).getTime() + obj.time;
				}


				var connection = getConnection();

				connection.connect();
				connection.query('INSERT INTO birdRecords.temp_info ' + 
					'(temp, measurement_time) values' +
					'(' + obj.temp + ', ' + obj.time + ')', function (err, rows, fields) {
					if (err){
						console.log("mysql error from mqtt");
						console.log({error: err});
						client.publish('/info/reporting', JSON.stringify({error: err}));
					}else{
						client.publish('/info/reporting', JSON.stringify({success: rows}));
					}
				});
				connection.end();
			}
		});
	}
}

export {mqttInit}