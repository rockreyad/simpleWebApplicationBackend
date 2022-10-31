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
exports.all_student = exports.update_student = exports.create_student = void 0;
const department_service_1 = require("../service/department.service");
const student_service_1 = require("../service/student.service");
function getErrorStatus(error) {
    return error.status;
}
const create_student = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, id, password, department, credit } = req.body;
        if (!name || !password || !department || !credit) {
            return res.status(400).json({
                message: 'Name , Password, department and credit Required field'
            });
        }
        const fetchDepartment = yield (0, department_service_1.findOneDepartment)({ short: department });
        const studentInfo = {
            name,
            studentId: id,
            password,
            depId: fetchDepartment === null || fetchDepartment === void 0 ? void 0 : fetchDepartment._id,
            credit,
            cgpa: 0
        };
        const find_student = yield (0, student_service_1.findStudent)({ studentId: studentInfo.studentId });
        if (find_student.length > 0) {
            throw {
                status: 409,
                message: 'Duplicated'
            };
            // return res.status(409).json({ message: 'Duplicated course' });
        }
        const student = yield (0, student_service_1.createStudent)(studentInfo);
        return res.status(201).send({
            message: 'Student added successfully!',
            data: student
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
exports.create_student = create_student;
const update_student = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, id, password, department } = req.body;
    if (!id || !(name || password || department)) {
        return res.status(400).json({
            message: 'Student Id and name or password or department is Required field'
        });
    }
    try {
        const fetchDepartment = yield (0, department_service_1.findOneDepartment)({ short: department });
        const studentInfo = {
            name,
            studentId: id,
            password,
            depId: fetchDepartment === null || fetchDepartment === void 0 ? void 0 : fetchDepartment._id
        };
        const find_student = yield (0, student_service_1.findOneStudent)({ id: studentInfo.studentId });
        if (!find_student) {
            throw {
                message: 'Not found!, Department course name or course code'
            };
        }
        yield (0, student_service_1.findAndUpdate)({ id: studentInfo.studentId }, { name: name, password: studentInfo.password, depId: studentInfo.depId }, { lean: true });
        return res.status(200).send({
            message: 'Student updated successfully!'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
});
exports.update_student = update_student;
const all_student = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    const student = yield (0, student_service_1.findStudent)({ filter });
    const allStudent = student.map((student) => student.studentId);
    return res.status(200).send({
        message: 'Student Id fetched successfully',
        data: allStudent
    });
});
exports.all_student = all_student;
//# sourceMappingURL=student.js.map