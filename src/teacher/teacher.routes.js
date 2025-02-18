import { Router } from "express";
import { getTeacherByIdValidator, deleteTeacherValidator, updatePasswordValidatorTeacher } from "../middlewares/check-validator.js";
import { getTeacherById, getTeachers, deleteTeacher, updatePassword, deleteCourse, createCourse, updateCourse, getTeacherCourses } from "./teacher.controller.js";

const router = Router()

router.post("/addCourse", createCourse)

router.delete("/deleteCourse/:courseId", deleteCourse)

router.put("/updateCourse/:courseId", updateCourse)

router.get("/findTeacher/:uid", getTeacherByIdValidator, getTeacherById)

router.get("/", getTeachers)

router.get("/getCourses/:uid", getTeacherCourses)

router.delete("/deleteTeacher/:uid", deleteTeacherValidator, deleteTeacher)

router.patch("/updatePassword/:uid", updatePasswordValidatorTeacher, updatePassword)

export default router