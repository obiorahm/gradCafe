 	var express = require('express');
	var router = express.Router();	
 	var arff = require('../node_modules/node-weka/node_modules/node-arff');
 	var weka = require('../node_modules/node-weka/lib/weka-lib.js');

router.post('/classify', function(req, res, next) {
	arff.load('./node_modules/node-weka/test/GradCafeAve.arff', function(err, data) {
	  if (err) {
	    return console.error(err);
	  }
	  console.log(data)


	var options = {
	  //'classifier': 'weka.classifiers.bayes.NaiveBayes', 

	  	//'classifier': 'weka.classifiers.functions.SMO',
	  	'classifier': 'weka.classifiers.trees.J48',
	  	'params'    : ''
	};

	var testData = {
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
	};

	weka.classify(data, testData, options, function (err, result) {

	  //console.log(result); //{ predicted: 'yes', prediction: '1' }
	  if (err){
	  	console.error(err)
	  } 
	  res.render('index', { 
	  						label: result.predicted });


	});


	}) 	
	  //res.render('index', { title: 'Express' });

});


module.exports = router;


