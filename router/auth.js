const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('../db/conn');
const User = require('../model/userSchema');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
// router.get('/', (req, res) => {
//     res.send(`hello world from home page`);
// });

// router.post('/register',(req, res) => {
//     const {name, email, phone, work, password, cpassword} = req.body;
//     console.log(name);
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error : 'fill the required fields'});
//     }
//     console.log(email);
//     User.findOne({email : email})
//     .then((userExists) => {
//         console.log(phone);
//         if(userExists){
//             return res.status(422).json({error : 'email already exist'});
//         }
//         else{
//             const user = new User({name, email, phone, work, password, cpassword});

//             user.save().then(() => {
//                 res.status(201).json({message : 'data saved successfully'});
//             }).catch((err) => {
//                 res.status(500).json({error : 'failed to save'})
//             });
//         }
//     }).catch((err) => {
//         console.log(err);
//     })
    
// })


router.post('/register', async(req, res) => {
    const {name, email, phone, work, password, cpassword} = req.body;
 
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({status:'422', error : 'fill the required fields'});
    }

    try{
        const userExists = await User.findOne({email : email});

        if(userExists){
            return res.status(422).json({status:'422',error : 'email already exist'});
        }else if(password != cpassword){
            return res.status(400).json({status:'400',error : 'mismatch in password & confirm password field'});
        }
        else{
            const user = new User({name, email, phone, work, password, cpassword});

            await user.save();
            res.status(201).json({status:'201',message : 'data saved successfully'});
        }
    }catch (err){
        console.log(err);
    }    
})

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({status : '400', error : 'fill the required fields'});
    }
    
    try{
        const findUser = await User.findOne({email : email});
        if(findUser){
           
            const isMatch = await bcrypt.compare(password, findUser.password);
            if(isMatch){
                const token = await findUser.generateAuthToken();
                res.cookie('jwtoken', token, {
                    expires : new Date(Date.now() + 2592000000),
                    httpOnly : true
                });
                return res.status(200).json({status:'200', message:'Login Successful'});
            }else{
                return res.status(400).json({status:'400', message:'Invalid Credentials'});
            }
        }else{
            return res.status(400).json({status:'400', message:'Invalid Credentials'});
        }
    }catch (err){
        console.log(err);
    } 
})

router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.get('/contact', authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.post('/contact', authenticate, async(req, res) => {
     try{
        const{name, email, phone, message} = req.body;

        if(!name || !email || !phone || !message){
            return res.send({status : '422', error : 'Required Fields Missing'});
        }

        const findUser = await User.findOne({_id : req.userID});

        if(findUser){
            const user = await findUser.addMessage(name, email, phone, message);
            await findUser.save();
            return res.status(201).json({status : "201", message : "Message Sent Successfully"})
        }else{
            return res.status(400).json({status : '400', error : 'No Such Error Found'});
        }
     }
     catch(error){
        console.log(error);
     }
});

router.get("/logout", async(req, res) => {
    res.clearCookie('jwtoken', {path : '/'});
    res.status(200).send('User Logout');
})
module.exports = router;