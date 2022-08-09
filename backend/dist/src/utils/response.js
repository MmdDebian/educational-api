"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// response function [the send data and message (status by default 200)]
function response(res, { message = "", data = {}, status = 200 }) {
    res.status(status).json({
        message,
        data
    });
}
exports.default = response;
