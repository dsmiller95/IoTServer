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

	var oldestDate = ((new Date()).getTime() - (1000 * 60 * 60 * 24));
	if(req.query.oldest && req.query.oldest > 0){
		oldestDate = req.query.oldest;
	}
	var newestDate = (new Date()).getTime();
	if(req.query.newest && req.query.newest > 0){
		newestDate = req.query.newest;
	}


	var minStep = (newestDate - oldestDate)/100 //at most return 100 items

	connection.connect();

	connection.query(`
		SET @tmp := 0;
		SELECT temp, (@tmp := measurement_time) as time
		FROM birdRecords.temp_info
		WHERE
			measurement_time > ${oldestDate} AND measurement_time < ${newestDate}
			AND (measurement_time - @tmp) >= ${minStep}
		ORDER BY time`, function (err, result, fields) {
		if (err){
			res.json({error: err});
		}else{
			res.json(result[1]);
		}
	});
	connection.end();
});

tempData.post('/record', upload.single(), (req: Request, res: Response, next: NextFunction) => {
	if(!(req.body.time && req.body.temp)){
		let err = new Error('Not enough information');
		return next(err);
	}

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
