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
exports.view_marks = exports.course_marks = exports.set_grade = void 0;
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
const course_marks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { course, student } = req.body;
    if (!course || !student) {
        return res.status(400).json({
            message: 'Course and student are Required field'
        });
    }
    try {
        const find_student = yield (0, student_service_1.findOneStudent)({ studentId: student }, { lean: false });
        if (!find_student) {
            throw {
                message: 'No student with this id!'
            };
        }
        const find_course = yield (0, course_service_1.findOneCourse)({ code: course }, { lean: false });
        if (!find_course) {
            throw {
                message: 'No course exists with this code!'
            };
        }
        const find_instructor = yield (0, courseInstructor_service_1.findInstructor)({ course: find_course._id }, { lean: false });
        if (find_instructor.length <= 0) {
            throw {
                message: `No teacher assigned for ${find_course.name} course!`
            };
        }
        const student_enroll = yield (0, enroll_service_1.findEnroll)({ student: find_student._id }, { lean: false }).populate('instructor');
        if (student_enroll.length <= 0) {
            throw {
                message: 'Student did not enrolled any course!'
            };
        }
        let assign_instructor = find_instructor.map((value) => value.id);
        let enroll_instructors = student_enroll.map((value) => value.instructor.id);
        let get_instructor = enroll_instructors.filter((element) => assign_instructor.includes(element));
        if (get_instructor.length <= 0) {
            throw {
                message: `Student did not enrolled ${find_course.name} course!`
            };
        }
        let course_marks = yield (0, grade_service_1.findOneGrade)({ student: find_student.id, courseInstructor: get_instructor }, { lean: false });
        if (!course_marks) {
            throw {
                message: `You did not get any marks in ${find_course.name}!`
            };
        }
        return res.status(200).send({
            message: `Yout got ${course_marks === null || course_marks === void 0 ? void 0 : course_marks.marks} Marks in ${find_course.name}`
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
});
exports.course_marks = course_marks;
const view_marks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { student } = req.body;
    try {
        const find_student = yield (0, student_service_1.findOneStudent)({ studentId: student }, { lean: false });
        if (!find_student) {
            throw {
                message: 'No student with this id!'
            };
        }
        const grades = yield (0, grade_service_1.findGrade)({ student: find_student._id }, { lean: false })
            .select('marks courseInstructor _id')
            .populate({ path: 'courseInstructor', populate: { path: 'course' } });
        if (grades.length <= 0) {
            throw {
                message: `${find_student.name} has not assign any course marks`
            };
        }
        //CGPA = course marks converted to grade point(4.00) then multi by course credit .. after sum every course grade then divided by stduent total credit taken
        const view_grade = grades.map((course) => ({
            name: course.courseInstructor.course.name,
            credit: course.courseInstructor.course.credit,
            marks: course.marks
        }));
        let cg = 0.0;
        let totalCredit = 0;
        view_grade.forEach((course) => {
            if (course.marks <= 100 || course.marks >= 90) {
                cg = course.credit * 4.0;
                totalCredit += course.credit;
            }
            else if (course.marks <= 80 || course.marks > 90) {
                cg = course.credit * 3.0;
                totalCredit += course.credit;
            }
        });
        let count_cgpa = (cg / totalCredit).toFixed(2);
        return res.status(200).send({
            message: `Results`,
            cgpa: count_cgpa,
            details: view_grade
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
});
exports.view_marks = view_marks;
//# sourceMappingURL=grade.js.map