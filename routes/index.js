var express = require('express');
var router = express.Router();
var fs = require('fs');
var jsonql = require('jsonql');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/:file', function(req,res,next){
  var path = req.params.file;
  var query = req.query.query;

  path = path + '.json'

  //created test.json file as a test
  fs.exists(path, function(exists){
    if (exists){
      fs.readFile(path, 'utf8', function(err, data){
        if (err){
          return next(err);
        }
        var obj = JSON.parse(data);
        var results = jsonql(query,obj);

        console.log(results);
        return res.json(results);
      });
    } else {
      return res.status(404).send("JSON file doesn't exist");
    }
  });
});

module.exports = router;
