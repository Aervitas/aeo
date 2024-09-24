import express from 'express'
const router = express.Router();
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticator } from '../../middleware/authenticate.js';
import { config } from 'dotenv';
config();

import { brotherModel } from '../models/brother.js';
const Brother = brotherModel;

router.post('/signup', authenticator, (req, res, next) => {
    /*request format:
    {
        email: testemail@123.com,
        name: testname,
        password: pass123
    }*/

   //make sure logged in user is an admin 
   let adminId = req.user._id;
   User.findOne({_id: adminId}).exec().then(currentUser => {
       if(!currentUser.admin){
           return res.status(401).json({
               message: 'Unauthorized'
           });
   }    
}); //end admin check

   //check if email already exists
    Brother.find({ email: req.body.email }).exec().then(brother => {
            if (brother.length > 0) {
                return res.status(409).json({
                    message: 'Email exists already'
                });
            } else {
                const userId = new mongoose.Types.ObjectId();
                bcrypt.hash(req.body.password, 10, (err, hashpass) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const brother = new Brother({
                            _id: userId,
                            email: req.body.email,
                            name: req.body.name,
                            password: hashpass,
                            roles: req.body.roles,
                            admin: req.body.admin
                        });
                        brother.save().then(result => {
                                res.status(201).json({
                                    message: 'Brother added!',
                                    brother: result
                                });
                            })
                            .catch(err => {
                                res.status(500).json({error: err});
                            });
                    } 
                });
            } //end brother creation 
        });
});

router.post('/login', (req, res, next) => {
    /*request format:
    {
        email: string,
        password: string,
        rememberMe: boolean
    }*/
   let expiresIn = '1h';
   if (req.body?.rememberMe) {
        expiresIn = '14d';
   }
    Brother.find({ email: req.body.email}).exec().then(brother => {
        if (brother.length < 1) {
            return res.status(401).json({
                message: 'Authorization failed'
            });
        }
        bcrypt.compare(req.body.password, brother[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Authorization failed'
                });
            }
            if (result) {
                const token = jwt.sign({
                    userId: brother[0]._id,
                    roles: brother[0].roles,
                    admin: brother[0].admin
                }, process.env.JWT_KEY, {
                    expiresIn: expiresIn
                });
                return res.status(200).json({
                    message: 'Authorization successful',
                    token: token,
                    userId: brother[0]._id,
                    roles: brother[0].roles,
                    admin: brother[0].admin
                });
            }
            res.status(401).json({
                message: 'Authorization failed'
            });
        });
    })
})

router.post("/logout", authenticator, (req, res, next) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter(token !== refreshToken);
    res.status(200).json({
        message: 'Logged out.'
    });
})

router.post("/checkAuth", authenticator, (req, res, next) => {
    res.status(200).json({
        message: 'Authorized'
    });
})

const routerBrother = router;
export { routerBrother };