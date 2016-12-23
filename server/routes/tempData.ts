import { Router, Response, Request, NextFunction } from 'express';

import { connectionObj } from '../config';

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var mysql = require('mysql');

function getConnection(){
	return mysql.createConnection(connectionObj);
}


const tempData: Router = Router();

tempData.get('/records', (req: Request, res: Response) => {
	var connection = getConnection();

	var oldestDate = req.query.oldest || ((new Date()).getTime() - (1000 * 60 * 60 * 24));

	console.log(oldestDate);


	connection.connect();

	connection.query(`
		SELECT temp, measurement_time as time
		FROM birdRecords.temp_info
		WHERE measurement_time > ${oldestDate}
		ORDER BY measurement_time`, function (err, rows, fields) {
		if (err){
			res.json({error: err});
		}else{
			res.json(rows);
		}
	});
	connection.end();
});

tempData.post('/record', upload.single(), (req: Request, res: Response, next: NextFunction) => {
	if(!(req.body.time && req.body.temp)){
		let err = new Error('Not enough information');
		return next(err);
	}

	console.log(req.body.temp);
	console.log(req.body.time);

	var connection = getConnection();

	connection.connect();
	connection.query('INSERT INTO birdRecords.temp_info ' + 
		'(temp, measurement_time) values' +
		'(' + req.body.temp + ', ' + req.body.time + ')', function (err, rows, fields) {
		if (err){
			res.json({error: err});
		}else{
			res.json({success: rows});
		}
	});
	connection.end();
});

export { tempData }
