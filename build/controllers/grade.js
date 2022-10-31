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
exports.set_grade = void 0;
const course_service_1 = require("../service/course.service");
const courseInstructor_service_1 = require("../service/courseInstructor.service");
const enroll_service_1 = require("../service/enroll.service");
const grade_service_1 = require("../service/grade.service");
const student_service_1 = require("../service/student.service");
const teacher_service_1 = require("../service/teacher.service");
const set_grade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacher, course, student, marks } = req.body;
    if (!teacher || !course || !student || !marks) {
        return res.status(400).json({
            message: 'Teacher, course ,student and marks Required field'
        });
    }
    try {
        const find_teacher = yield (0, teacher_service_1.findOneTeacher)({ name: teacher });
        if (!find_teacher) {
            throw {
                message: 'No teacher found!'
            };
        }
        const find_course = yield (0, course_service_1.findOneCourse)({ code: course });
        if (!find_course) {
            throw {
                message: 'No course exists with this code!'
            };
        }
        const find_instructor = yield (0, courseInstructor_service_1.findOneInstructor)({ course: find_course._id, teacher: find_teacher._id }, { lean: false });
        if (!find_instructor) {
            throw {
                message: 'You are not the instructor for this course!'
            };
        }
        const find_student = yield (0, student_service_1.findOneStudent)({ studentId: student }, { lean: false });
        if (!find_student) {
            throw {
                message: 'No student with this id!'
            };
        }
        const find_enroll = yield (0, enroll_service_1.findOneEnroll)({ instructor: find_instructor._id }, { lean: false }).populate('student');
        let check_enrolled = find_enroll === null || find_enroll === void 0 ? void 0 : find_enroll.student.find((value) => {
            return value.id == find_student.id;
        });
        if (!check_enrolled) {
            throw {
                message: 'Student not enrolled in your course!'
            };
        }
        const gradeInfo = {
            student: find_student._id,
            marks: marks,
            courseInstructor: find_instructor._id
        };
        const duplicate_grade = yield (0, grade_service_1.findOneGrade)({ student: find_student._id, courseInstructor: find_instructor._id }, { lean: true });
        if (duplicate_grade) {
            throw {
                message: `Marks already submitted!`
            };
        }
        yield (0, grade_service_1.setGrade)(gradeInfo);
        return res.status(201).send({
            message: `${marks} marks added for this Id ${student} successfully!`
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
});
exports.set_grade = set_grade;
//# sourceMappingURL=grade.js.map