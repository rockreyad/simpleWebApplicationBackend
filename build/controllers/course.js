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
exports.all_course = exports.delete_course = exports.update_course = exports.create_course = void 0;
const course_service_1 = require("../service/course.service");
function getErrorStatus(error) {
    return error.status;
}
const create_course = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, code, credit } = req.body;
        if (!name || !code) {
            return res.status(400).json({
                message: 'Name & Course Code Required field'
            });
        }
        const courseInfo = {
            name,
            code,
            credit
        };
        const find_course = yield (0, course_service_1.findCourse)({ code: courseInfo.code });
        if (find_course.length > 0) {
            throw {
                status: 409,
                message: 'Duplicated'
            };
            // return res.status(409).json({ message: 'Duplicated course' });
        }
        const course = yield (0, course_service_1.createCourse)(courseInfo);
        return res.status(201).send({
            message: 'Course added successfully!',
            data: course
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
exports.create_course = create_course;
const update_course = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, name, credit } = req.body;
    if (!code || !(name || credit)) {
        return res.status(400).json({
            message: 'Course Code and name or credit is Required field'
        });
    }
    try {
        const courseInfo = {
            name,
            code,
            credit
        };
        if (courseInfo.name) {
        }
        const find_course = yield (0, course_service_1.findCourse)({ code: courseInfo.code });
        if (!find_course) {
            throw {
                message: 'Not found!, Correct course name or course code'
            };
        }
        yield (0, course_service_1.findAndUpdate)({ code: code }, { name: name, credit: credit }, { lean: true });
        return res.status(200).send({
            message: 'Course updated successfully!'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
});
exports.update_course = update_course;
const all_course = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    const courses = yield (0, course_service_1.findCourse)({ filter });
    const allCourse = courses.map((course) => course.name);
    return res.status(200).send({
        message: 'Course updated successfully!',
        data: allCourse
    });
});
exports.all_course = all_course;
const delete_course = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, name } = req.body;
    if (!(code || name)) {
        return res.status(400).json({
            message: 'Course Code or name is Required field'
        });
    }
    try {
        const courseInfo = {
            code,
            name
        };
        const find_course = yield (0, course_service_1.findOneCourse)({ code: courseInfo.code } || { name: courseInfo.name });
        if (!find_course) {
            throw {
                message: 'Not found!, Correct course name or course code'
            };
        }
        yield (0, course_service_1.deleteCourse)({ _id: find_course._id });
        return res.status(200).send({
            status: 'SUCCESS',
            message: 'Course deleted successfully!'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
exports.delete_course = delete_course;
//# sourceMappingURL=course.js.map