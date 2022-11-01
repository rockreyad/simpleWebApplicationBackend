"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const course_1 = require("../controllers/course");
const department_1 = require("../controllers/department");
const student_1 = require("../controllers/student");
const teacher_1 = require("../controllers/teacher");
const courseInstructor_1 = require("../controllers/courseInstructor");
const enroll_1 = require("../controllers/enroll");
const grade_1 = require("../controllers/grade");
function routes(app) {
    /** Home Page */
    app.get('/', (req, res) => {
        res.status(200).send('Welcome to Rest Api Service');
    });
    /** Course:  create,read,updateByFilter,update,delete */
    app.post('/create-new-course', course_1.create_course);
    app.get('/course', course_1.all_course);
    app.patch('/update-course', course_1.update_course);
    app.delete('/delete-course', course_1.delete_course);
    /** Department: create,read,updateByFilter,update,delete */
    app.post('/create-new-department', department_1.create_department);
    app.get('/department', department_1.all_department);
    app.patch('/update-department', department_1.update_department);
    app.delete('/delete-department', department_1.delete_department);
    /** Student: create,update*/
    app.get('/student', student_1.all_student);
    app.post('/create-new-student', student_1.create_student);
    app.patch('/update-student', student_1.update_student);
    /** Teacher: create,update,read */
    app.get('/teacher', teacher_1.all_teacher);
    app.post('/create-new-teacher', teacher_1.create_teacher);
    app.patch('/update-teacher', teacher_1.update_teacher);
    /** Instructor : set*/
    app.post('/set-instructor', courseInstructor_1.set_instructor);
    /** Enroll : enroll student */
    app.post('/enroll', enroll_1.enroll_student);
    app.delete('/enroll', enroll_1.course_drop);
    /** Grade: set ,get marks of one course*/
    app.post('/set-grade', grade_1.set_grade);
    app.get('/course-marks', grade_1.course_marks);
    app.get('/grade', grade_1.view_marks);
    /** About Page */
    app.get('/about', (req, res) => {
        res.status(200).send({
            message: 'We are working only for your service'
        });
    });
}
exports.default = routes;
//# sourceMappingURL=index.js.map