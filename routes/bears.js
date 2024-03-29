var express = require('express');
var router = express.Router();

var Bear = require('../models/bear');

// ROUTE '/bears'
router.route('/bears')


  // POST to create a bear
  .post(function(req, res) {
    var bear = new Bear();
    bear.name = req.body.name;

    bear.save(function(err) {
      if (err) {res.send(err)};
      res.json({ Message: 'Bear created!' });
    });
  })

  // GET to fetch all the bears
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err) {res.send(err)};
      res.json(bears);
    });
  });


// ROUTE '/bears/:bear_id'
router.route('/bears/:bear_id')

  // GET a specific bear
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) {res.send(err)};
      res.json(bear);
    });
  })

  // PUT a specific bear
  .put(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) {res.send(err)}
      bear.name = req.body.name; // updates the bear's info
      bear.save(function(err) {
        if (err) {res.send(err)};
        res.json({ Message: 'Bear updated!'} );
      });
    });
  })

  // DELETE a specific bear
  .delete(function(req, res) {
    Bear.remove({ _id: req.params.bear_id }, function (err, bear) {
      if (err) {res.send(err)};
      res.json({ Message: 'Bear successfully deleted!' });
    });
  });

module.exports = router;
