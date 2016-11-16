import { Router, Response, Request, NextFunction } from 'express';

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var mysql = require('mysql');

function getConnection(){
	return mysql.createConnection({
		host: 'localhost',
		user: 'default',
		password: 'secret'
	});
}

const publicRouter: Router = Router();

publicRouter.get('/simple', (request: Request, response: Response) => {
	setTimeout(function(){

	  response.json({
	    title: 'Greetings.',
	    text: 'Hello Angular 2'
	  });
	}, 1000);
});

publicRouter.get('/records', (req: Request, res: Response) => {
	var connection = getConnection();

	connection.connect();
	connection.query('SELECT * FROM birdRecords.temp_info ORDER BY measurement_time', function (err, rows, fields) {
		if (err){
			res.json({error: err});
		}else{
			res.json(rows);
		}
	});
	connection.end();
});

publicRouter.post('/record', upload.single(), (req: Request, res: Response, next: NextFunction) => {
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

export { publicRouter }
