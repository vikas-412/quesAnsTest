var express = require('express');
var router = express.Router();
const addQuesAnsControl = require('../controllers/addQuesAns')
const sendTestPaperControl = require('../controllers/sendTestPaper')
const getResultControl = require('../controllers/getResult')
const signupControl = require('../controllers/signupControl')
const loginControl = require('../controllers/loginControl');
const checkRoleControl = require('../controllers/checkRoleControl');
const adminPageDataControl = require('../controllers/adminPageDataControl');
const deleteQAControl = require('../controllers/deleteQAControl');

const authenticator = require('../controllers/authenticator');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/', (req, res, next) => {
  console.log(req.body);
  res.send({
    message: 'Data transfer success 1',
    success: true
  });
});
router.post('/signup', signupControl);
router.post('/login', loginControl);
router.use(authenticator);
router.get('/checkrole',checkRoleControl);
router.post('/add', addQuesAnsControl);
router.get('/testpaper',sendTestPaperControl);
router.post('/getresult', getResultControl);
router.get('/getadminpage',adminPageDataControl);
router.post('/deleteQA',deleteQAControl);

module.exports = router;
