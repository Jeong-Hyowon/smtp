var express = require('express');
var router = express.Router();

router.get("/result", (req, res, next)=> {
    res.render("result");
  });
  
module.exports = router;