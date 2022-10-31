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
exports.all_teacher = exports.update_teacher = exports.create_teacher = void 0;
const teacher_service_1 = require("../service/teacher.service");
function getErrorStatus(error) {
    return error.status;
}
const create_teacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({
                message: 'Name and Password Required field'
            });
        }
        const teacherInfo = {
            name,
            password
        };
        const find_teacher = yield (0, teacher_service_1.findTeacher)({ name: teacherInfo.name });
        if (find_teacher.length > 0) {
            throw {
                status: 409,
                message: 'Duplicated'
            };
            // return res.status(409).json({ message: 'Duplicated course' });
        }
        const teacher = yield (0, teacher_service_1.createTeacher)(teacherInfo);
        return res.status(201).send({
            message: 'Teacher added successfully!',
            data: teacher
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
exports.create_teacher = create_teacher;
const update_teacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, newName, password } = req.body;
    if (!name || !(password || newName)) {
        return res.status(400).json({
            message: 'Teacher name and newName or password is Required field'
        });
    }
    try {
        const teacherInfo = {
            name,
            newName,
            password
        };
        const find_teacher = yield (0, teacher_service_1.findTeacher)({ name: teacherInfo.name });
        if (find_teacher.length <= 0) {
            throw {
                message: 'No teacher found!'
            };
        }
        yield (0, teacher_service_1.findAndUpdate)({ name: teacherInfo.name }, { name: teacherInfo.newName, password: teacherInfo.password }, { lean: true });
        return res.status(200).send({
            message: 'Teacher updated successfully!'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
});
exports.update_teacher = update_teacher;
const all_teacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    const teacher = yield (0, teacher_service_1.findTeacher)({ filter });
    const allTeacher = teacher.map((teacher) => teacher.name);
    return res.status(200).send({
        message: 'Teacher name fetched successfully',
        data: allTeacher
    });
});
exports.all_teacher = all_teacher;
//# sourceMappingURL=teacher.js.map