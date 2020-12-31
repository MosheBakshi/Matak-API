/*jshint ignore:start*/

module.exports = (message, statusCode) => {
    const error = new Error(message);
    error.status = statusCode;
    return error;
};