import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import captchaRouter from "./services/captcha/routes.js"
import accountsRouter from "./services/account/routes.js"

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())

app.use("/captcha", captchaRouter)
app.use("/accounts", accountsRouter)

mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log("Server listening on port " + PORT)))
  .catch((err) => console.log(err))
