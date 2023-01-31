
const user2model = require('../models/user2model')
const userModel = require('../models/userModel')
const { isValid,
    isValidEmail,
    isValidName,
    isValidPassword,
    isValidPincode,
    isValidRequestBody,
    isValidTitle,
    isValidPhone,
    isValidDate,
    isValidObjectId,
} = require("../utilitys/validation")





/**________________________________--=========> create bank account<===========--_______________________________________________________ */

const createBank = async function (req, res) {
    try {
        const reqdata = req.body;

        if (!isValidRequestBody(reqdata)) return res.status(400).send({
            status: false, message: "Invalid request parameters. Please provide user details"
        })

        let {userId,transitionNo,transitionType,amount,releasedAt ,title,name,phone,email, password,address } = reqdata;

        if (!isValid(userId))
            return res.status(400).send({ status: false, message: "userId is required" })
            if (!isValidObjectId(userId)) {
                return res.status(400).send({ status: false, message: "userId is invalid" })
            }
            
        if (!isValid(amount)) {
            return res.status(400).send({ status: false, message: "account  is required" })
        }


        if (!isValid(transitionNo)) {
            return res.status(400).send({ status: false, message: "transition No is required" })
        }

        const isUniqueUserId = await userModel.findOne({ userId })
        if (isUniqueUserId.length == 0) {
            return res.status(400).send({ status: false, message: "please provide valid userId" })
        }
        if (!isValid(transitionType)) {
            return res.status(400).send({ status: false, message: " type account is required" })
        }
        if (!isValid(releasedAt)) {
            return res.status(400).send({ status: false, message: "releaseAT is required" })
        }
        if (!(isValidDate(releasedAt))) {
            return res.status(400).send({ status: false, message: "Date must be in the format YYYY-MM-DD" })
        }
        
      const data = await user2model.create(reqdata)
     
        const releasedAt1 = new Date(data.releasedAt).toISOString().slice(0, 10)

        let obj = {
            _id: data._id,
            
            userId: data.userId,
            accountNo: data.accountNo,
            accountType: data.accountType,
            isDeleted: data.isDeleted,
            deletedAt: data.deletedAt,
            releasedAt: releasedAt1,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            title:data.title,
            name:data.name,
            phone:data.phone,
            email:data.email,
            password:data.password,
            address:data.address,
            amount:data. amount,

        }
        if (!isValid(title))
        return res.status(400).send({ status: false, message: "Title is required" })
    if (!isValidTitle(title)) {
        return res.status(400).send({ status: false, message: "Title should be among Mr, Mrs, Miss" })
    }
    //validating the title with above two function

    if (!isValid(name))
        return res.status(400).send({ status: false, message: "First name is required" })

    if (!(isValidName(name))) {
        return res.status(400).send({ status: false, message: "please provide correct user name" })
    }
    //    validating the name with regex       

    if (!isValid(phone))
        return res.status(400).send({ status: false, message: "phone number is required" })

    if (!(isValidPhone(phone))) {
        return res.status(400).send({ status: false, message: "Please provide a valid mobile number, it should start 6-9.(you can also use STD code 0)" })
    } //    validating the phone with regex       
    const isUniquePhone = await userModel.findOne({ phone })
    if (isUniquePhone) return res.status(400).send({ status: false, message: "phone no already exists. Please provide another phone number" })

    if (!isValid(email))
        return res.status(400).send({ status: false, message: "E-mail is required" })
    // validating the email

    if (!(isValidEmail(email))) {
        return res.status(400).send({ status: false, message: "E-mail should be a valid e-mail address" })
    }
    // validating the email with regex

    let isUniqueEmail = await userModel.findOne({ email: email })
    if (isUniqueEmail)
        return res.status(400).send({ status: false, message: "This e-mail address is already exist , Please enter valid E-mail address" })
    //checking the user email is correct or not 

    if (!isValid(password))
        return res.status(400).send({ status: false, message: "password is not exist" })
    // password is present or not

    if (!(isValidPassword(password))) {
        return res.status(400).send({ status: false, message: "password should contain at least One digit, one upper case , one lower case , its b/w 8 to 15" })
    }
    //validating the password with regex
    if (address) {
        // type of address check object or not
        if(typeof address !=="object"){
           return res.status(400).send({status:false,message:"address should be in object form"})
        }

        if (address.street) {
            if (!isValid(address.street))                               //=======
                return res.status(400).send({ status: false, message: "provide street name" })
        }
        if (address.city) {
            if (!isValid(address.city))
                return res.status(400).send({ status: false, message: "provide city name" })
        }
        if (address.pincode) {
            if (!(isValidPincode(address.pincode)))
                return res.status(400).send({ status: false, message: "pincode is invalid" })
        }
    }


        return res.status(201).send({ status: true, message: 'Success bank account created  ', data: obj })

    }
    catch (err) { return res.status(500).send({ message: "Error", error: err.message }) }
}
/**_______________________________________________  update_______________________________________________ */

const Updateuser2 = async function (req, res) {
    try {
        let userId = req.params.userId
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "userId invalid" })
        let updateData = req.body

        if (!isValidRequestBody(updateData)) return res.status(400).send({
            status: false, message: "Invalid Please provide deposite details"
        })

        let { amount, name, releasedAt } = updateData

        let validuser2 = await user2model.findOne({ _id: userId })

        if (!validuser2) return res.status(404).send({ status: false, message: "amount not found" })

        if (validuser2.isDeleted) { return res.status(404).send({ status: false, message: "amount is already Deleted" }) }
        
        if (name) {
            if (isValid(name)) {
                
                let checkname = await user2model.findOne({ name: name })
                if (checkname) {
                    return res.status(400).send({ status: false, message: "name is already exits plz enter a new title" })
                } else {
                    validuser2.name= name
                }        
        }}
        if (releasedAt) {
            if (isValid(releasedAt)) {
                if (!(isValidDate(releasedAt))) { return res.status(400).send({ status: false, message: "Date must be in the format YYYY-MM-DD" }) }

                validuser2.releasedAt = releasedAt

            } else {
                return res.status(400).send({ status: false, message: "provide valid date" })

            }
        }

        validuser2.save();

        return res.status(200).send({ status: true, message: "user2 update succesfully", data: validamount })

    }
    catch (err) { return res.status(500).send({ message: "Error", error: err.message }) }
}





module.exports.createBank = createBank

module.exports.Updatuser2 = Updateuser2

