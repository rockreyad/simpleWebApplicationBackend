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
exports.set_instructor = void 0;
const course_service_1 = require("../service/course.service");
const courseInstructor_service_1 = require("../service/courseInstructor.service");
const teacher_service_1 = require("../service/teacher.service");
const set_instructor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { course, teacher } = req.body;
        if (!course || !teacher) {
            return res.status(400).json({
                message: 'course and teacher Required field'
            });
        }
        const find_course = yield (0, course_service_1.findOneCourse)({ code: course } || { name: course });
        if (!find_course) {
            return res.status(404).json({
                message: 'Please give a correct course code'
            });
        }
        const find_teacher = yield (0, teacher_service_1.findOneTeacher)({ name: teacher });
        if (!find_teacher) {
            throw {
                message: 'No teacher Found!'
            };
        }
        const instructorInfo = {
            course: find_course._id,
            teacher: find_teacher._id
        };
        const instructor = yield (0, courseInstructor_service_1.setInstructor)(instructorInfo);
        return res.status(201).send({
            message: 'Instructor added successfully!',
            data: instructor
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
});
exports.set_instructor = set_instructor;
//# sourceMappingURL=courseInstructor.js.map