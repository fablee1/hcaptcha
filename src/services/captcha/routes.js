import { Router } from "express"
import * as controllers from "./controllers.js"

const router = Router()

router.get("/:add", controllers.getCaptchaResult).post("/:add", controllers.solveCaptcha)

export default router
