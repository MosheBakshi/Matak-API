const jwt = require('jsonwebtoken');
const queries = require('../utils/queries');
const errorHandler = require('../utils/errors');
const redis = require('../utils/redis');

/**
 * Gets bearer token from req.headers (authorization section).
 * 
 * If token is defined, it is extracted, and applied to req.token.
 * Else, sends 403 status (access forbidden).
 */
const formatAndSetToken = async (req, res, next) => {

    /* Get auth header value. */
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        /* Next middleware */
        next();
    }
    else {
        next(errorHandler('Forbidden', 403));
    }
};


// * Second middleware of '/login'.
