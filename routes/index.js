var express = require('express');
var router = express.Router();
const inputControllers = require('../controllers/inputControllers');

const userControllers = require('../controllers/userController');
router.post('/mail', inputControllers.answer1);
/* GET home page. */
router.get("/mail", (req, res, next)=> {
  res.render("mail");
});

router.get("/result", (req, res, next)=> {
  res.render("result");
});

router.post('/user', userControllers.auth);

router.get("/user",(req,res,next) => {
  res.render("user")
})

module.exports = router;
