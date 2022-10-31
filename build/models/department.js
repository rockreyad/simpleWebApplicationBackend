"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const departmentSchema = new mongoose_1.Schema({
    name: String,
    short: String
});
const DepartmentModel = (0, mongoose_1.model)('Department', departmentSchema);
exports.default = DepartmentModel;
//# sourceMappingURL=department.js.map