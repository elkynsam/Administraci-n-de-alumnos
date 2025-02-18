import { Router } from "express";
import { getAllCourses} from "../course/course.controller.js";

const router = Router()

router.get("/", getAllCourses)

export default router