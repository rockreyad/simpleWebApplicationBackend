"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all_department = exports.delete_department = exports.update_department = exports.create_department = void 0;
const department_service_1 = require("../service/department.service");
function getErrorStatus(error) {
    return error.status;
}
const create_department = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, code } = req.body;
        if (!name || !code) {
            return res.status(400).json({
                message: 'Name & short Code Required field'
            });
        }
        const departmentInfo = {
            name,
            short: code
        };
        const find_department = yield (0, department_service_1.findDepartment)({ short: departmentInfo.short });
        if (find_department.length > 0) {
            throw {
                status: 409,
                message: 'Duplicated'
            };
            // return res.status(409).json({ message: 'Duplicated course' });
        }
        const department = yield (0, department_service_1.createDepartment)(departmentInfo);
        return res.status(201).send({
            message: 'Department added successfully!',
            data: department
        });
    }
    catch (error) {
        let status = getErrorStatus(error);
        res.status(status || 500).json({
            status: 'FAILED',
            message: error
        });
    }
});
exports.create_department = create_department;
const update_department = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, code } = req.body;
    if (!code || !name) {
        return res.status(400).json({
            message: 'Department Code and name is Required field'
        });
    }
    try {
        const departmentInfo = {
            name,
            short: code
        };
        const find_department = yield (0, department_service_1.findDepartment)({ short: departmentInfo.short });
        if (!find_department) {
            throw {
                message: 'Not found!, Department course name or course code'
            };
        }
        yield (0, department_service_1.findAndUpdate)({ short: departmentInfo.short }, { name: name }, { lean: true });
        return res.status(200).send({
            message: 'Department updated successfully!'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
});
exports.update_department = update_department;
const all_department = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    const department = yield (0, department_service_1.findDepartment)({ filter });
    const allDepartment = department.map((department) => department.short);
    return res.status(200).send({
        message: 'Department updated successfully!',
        data: allDepartment
    });
});
exports.all_department = all_department;
const delete_department = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, code } = req.body;
    if (!(code || name)) {
        return res.status(400).json({
            message: 'Department Code or name is Required field'
        });
    }
    try {
        const departmentInfo = {
            name,
            short: code
        };
        const find_department = yield (0, department_service_1.findOneDepartment)({ short: departmentInfo.short } || { name: departmentInfo.name });
        if (!find_department) {
            throw {
                message: 'Not found!, Correct department name or code'
            };
        }
        yield (0, department_service_1.deleteDepartment)({ _id: find_department._id });
        return res.status(200).send({
            status: 'SUCCESS',
            message: 'Department deleted successfully!'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
exports.delete_department = delete_department;
//# sourceMappingURL=department.js.map