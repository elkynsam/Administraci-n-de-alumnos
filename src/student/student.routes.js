import { Router } from "express";
import { getStudentByIdValidator, deleteStudentValidator, updatePasswordValidatorStudent } from "../middlewares/check-validator.js";
import { getStudentById, getStudents, deleteStudent, updatePassword, getStudentCourses, enrollInCourse, updateStudent } from "./student.controller.js";

const router = Router()

router.get("/getCourses/:uid", getStudentCourses)

router.post("/enrollInCourse", enrollInCourse)

router.get("/findStudent/:uid", getStudentByIdValidator, getStudentById)

router.get("/", getStudents)

router.delete("/deleteStudent/:uid", deleteStudentValidator, deleteStudent)

router.patch("/updatePassword/:uid", updatePasswordValidatorStudent, updatePassword)

router.put("/updateStudent/:uid", updateStudent)

export default router