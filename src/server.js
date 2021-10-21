import express from "express"
import cors from "cors"
import Captcha from "2captcha"

const solver = new Captcha.Solver(process.env.CAPTCHA_API)

const port = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())

app.get("/captcha", async (req, res) => {
  const apiTimeout = 120 * 1000
  // Set the timeout for all HTTP requests
  req.setTimeout(apiTimeout, () => {
    let err = new Error("Request Timeout")
    err.status = 408
    next(err)
  })
  // Set the server response timeout for all HTTP requests
  res.setTimeout(apiTimeout, () => {
    let err = new Error("Service Unavailable")
    err.status = 503
    next(err)
  })
  try {
    const solveCaptcha = async () => {
      const pageUrl = "www.botheredotters.com"
      const siteKey = "3f841199-7b49-4b3c-8ad8-846faa8be04f"
      const { data } = await solver.hcaptcha(siteKey, pageUrl)
      return data
    }
    const token = await solveCaptcha()
    res.send({ token })
  } catch (e) {
    console.log(e)
    res.sendStatus(404)
  }
})

const server = app.listen(port, () => {
  console.log(`App listening`)
})
server.setTimeout(120000)
