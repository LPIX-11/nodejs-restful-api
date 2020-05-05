(function () {
    'use strict';

    const log = require('./log');

    /**
     * Call this method if you want to return data
     * And set the default status code to 200
     * @param {*} payload
     * @param {*} res
     */
    exports.data = (payload, res) => res.status(200).json(payload);

    /**
     * Return data and define the status code
     * @param {*} payload
     * @param {*} status
     * @param {*} res
    */
    exports.dataStatus = (payload, status, res) => res.status(status).json(payload);

    /**
     * Sends a message with a default status of 200
     * @param {*} message
     * @param {*} response
     */
    exports.message = (message, res) => exports.send(false, message, 200, res);

    /**
     * Sends a message wi a defined status code
     * @param {*} message
     * @param {Int} status
     * @param {*} response
     */
    exports.messageStatus = (message, status, res) => exports.send(false, message, status, res);

    exports.error = (message, res) => exports.send(true, message, 400, res);

    exports.errorStatus = (message, status, res) => exports.send(true, message, status, res);

    exports.errorReject = (reject, res) =>
        exports.send(true, reject.message || `Internal server error`, reject.status || 500, res);

    /**
     * Reject the promise with an error message
     * Default status code 400
     * @param {*} message
     */
    exports.reject = message => {
        return message;
    };

    /**
     * Reject the promise with an error message
     * Define the status code
     * @param {*} message
     * @param {*} status
     */
    exports.rejectStatus = (message, status) => {
        return {
            message,
            status
        };
    };
    
    exports.send = (error, message, status, res) => {
        let data = {
            error,
            message,
            status
        };
        if (error) {
            log.e(JSON.stringify(message, null, 3));
        }
        res.status(status).json(data);
    };

}());