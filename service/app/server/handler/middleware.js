const jwt = require('jsonwebtoken');

module.exports.validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>
        
        jwt.verify(token, process.env.SERVICE_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({
            success: false,
            message: 'Invalid token',
            });
        } else {
            req.officer = payload;
            next();
        }
        });
    } else {
        res.status(401).json({
        success: false,
        message: 'Token is not provided',
        });
    }
};

module.exports.validateMidtransSignature = (req, res, next) => {
    body = req.body

    
}