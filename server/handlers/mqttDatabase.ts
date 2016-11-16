import { connectionObj } from '../config';


var mysql = require('mysql');
function getConnection(){
	return mysql.createConnection(connectionObj);
}

const mqtt = require('mqtt')  ;


class mqttInit{
	constructor(){
		const client = mqtt.connect('mqtt://broker.hivemq.com');

		console.log("loading mqttDatabase");

		var garageState = ''  
		var connected = false

		client.on('connect', () => {  
		  client.subscribe('/dantest/info/temp')
		});

			client.on('message', (topic, message) => {  
				if(topic === '/dantest/info/temp') {

				console.log(message.toString());
				try{
					var obj = JSON.parse(message.toString());
				}catch(exception){
					console.log("Error parsing mqtt message:");
					console.log(topic, message.toString());
					console.log(exception);
					return;
				}
				

				if(!(obj.temp && obj.time))
					return;
				}


				var connection = getConnection();

				connection.connect();
				connection.query('INSERT INTO birdRecords.temp_info ' + 
					'(temp, measurement_time) values' +
					'(' + obj.temp + ', ' + obj.time + ')', function (err, rows, fields) {
					if (err){
						console.log("mysql error from mqtt");
						console.log({error: err});
					}else{
						client.publish('/dantest/info/reporting', JSON.stringify({success: rows}));
					}
				});
				connection.end();


			});
		}
	}
}

export {mqttInit}