const express = require('express');
const router = express.Router();

const receiveMessage = async (req, res) => {
    console.log(req.body)
}

router.post('/v1/message/notification', receiveMessage)

module.exports = router