import { Router } from "express"
import * as controllers from "./controllers.js"

const router = Router()

router
  .post("/farmHours", controllers.getCaptchaFarmHours)
  .get("/test", controllers.getTestCaptcha)
  .post("/test", controllers.solveTestCaptcha)
  .get("/:add", controllers.getCaptchaResult)
  .post("/:add", controllers.solveCaptcha)

export default router
