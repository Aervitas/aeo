import express from 'express'
const router = express.Router();

import { pollModel } from '../models/poll.js';

const Poll = pollModel;

router.post("/pollCreate", (req, res, next) => {

    /*
    request format:
    {
        topic: "test topic",
        options: [
            {text: "option 1"},
            {text: "option 2"},
            {text: "option 3"}
        ],
        expiresAt: "2024-12-31T23:59:59.999Z"
    */
    const poll = new Poll({
        topic: req.body.topic,
        options: req.body.options,
        expiresAt: req.body.expiresAt,
    });
    poll.save().then(result => {
        res.status(201).json({
            message: 'Poll created!',
            poll: result
        });
    }).catch(err => {
        res.status(500).json({error: err});
    });

});

const routerPolls = router;
export { routerPolls };