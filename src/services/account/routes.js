import { Router } from "express"
import * as controllers from "./controllers.js"

const router = Router()

router
  .post("/", controllers.addAccount)
  .put("/:add", controllers.updateAccount)
  .get("/all", controllers.getAllAccounts)
  .get("/jobs", controllers.getJobs)
  .put("/:add/twitter", controllers.updateTwitter)
  .get("/checkBanned", controllers.findBannedAccs)

export default router
