import { Router } from "express"
import * as controllers from "./controllers.js"

const router = Router()

router.get("/", controllers.getTwitter).post("/", controllers.postTwitter)

export default router
