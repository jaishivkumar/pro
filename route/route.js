const express = require('express');
const router =express.Router();
const userController =require('../controller/userController')
const user2Controller =require('../controller/user2Controller')

const auth =require('../middlewares/auth')


/*_____________________________--====> USER API <====----___________________________________*/
router.post("/register", userController.createUser) //To create a user

router.post("/login", userController.userLogIn) // For login 

/*____________________________---====> user2 API <====----___________________________________*/

router.post("/user2",auth.authentication,auth.userAuthorization, user2Controller.createBank) 


router.put('/user2/:userId',auth.authentication,auth.amountAuthorization,user2Controller.Updatuser2)









module.exports = router;