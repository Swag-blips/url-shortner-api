"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
exports.default = (0, yup_1.object)({
    destination: (0, yup_1.string)()
        .url("A valid url is required")
        .required("Destination is required"),
});
