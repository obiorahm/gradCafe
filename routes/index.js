	var express = require('express');
	var router = express.Router();	
 	var arff = require('../node_modules/node-weka/node_modules/node-arff');
 	var weka = require('../node_modules/node-weka/lib/weka-lib.js');

/* GET home page. */
router.get('/', function(req, res, next) {

	  res.render('index', { title: 'Express' });
	});

router.post('/', function(req, res, next) {
	arff.load('./node_modules/node-weka/test/GradCafeAve.arff', function(err, data) {
	  if (err) {
	    return console.error(err);
	  }
	  //console.log(data)


	var options = {
	  //'classifier': 'weka.classifiers.bayes.NaiveBayes', 

	  	//'classifier': 'weka.classifiers.functions.SMO',
	  	'classifier': 'weka.classifiers.trees.J48',
	  	'params'    : ''
	};

	/*var testData = {
		GPA	: 3.75,
		Writing_GRE	: 3.5,
		Status: 'I',
		Degree_Type	: 'Phd',
		verbal_GRE	: 142,
		quant_GRE	: 164,
		Result : '?'
/*	  outlook    : 	'sunny',
	  temperature: 30,
	  humidity   : 2,
	  windy      : 'TRUE',
	play       : 'no' // last is class attribute */
	//};
	//console.log("The Degree_Type" +req.body);
	console.log("The Degree_Type" +req.body.GPA);
	console.log("The Status" +req.body.status);	
	var testData = {
		GPA	: parseFloat(req.body.GPA),
		Writing_GRE	: parseFloat(req.body.writing),
		Status: req.body.status,
		Degree_Type	: req.body.d_type,
		verbal_GRE	: parseInt(req.body.verbal),
		quant_GRE	: parseInt(req.body.quant),
		Result : '?'
	};


	weka.classify(data, testData, options, function (err, result) {

	  //console.log(result); //{ predicted: 'yes', prediction: '1' }
	  if (err){
	  	console.error(err)
	  } 
	  res.render('index', { title: 'Express',
	  						label: result.predicted });


	});


	}) 	
	  //res.render('index', { title: 'Express' });

});

module.exports = router;
