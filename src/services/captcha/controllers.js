import Captcha from "2captcha"
import solanaWeb3 from "@solana/web3.js"

import { Captcha as Capt } from "simple-emoji-captcha"

const simpleCaptcha = new Capt()

const solver = new Captcha.Solver(process.env.CAPTCHA_API)

const captchas = {}

export const solveCaptcha = async (req, res, next) => {
  try {
    res.sendStatus(200)
    if (captchas[req.params.add]) {
      delete captchas[req.params.add]
    }
    const solveCaptcha = async () => {
      const pageUrl = "www.botheredotters.com"
      const siteKey = "3f841199-7b49-4b3c-8ad8-846faa8be04f"
      const { data } = await solver.hcaptcha(siteKey, pageUrl)
      return data
    }
    const token = await solveCaptcha()
    captchas[req.params.add] = token
  } catch (e) {
    console.log(e)
  }
}

export const getCaptchaResult = async (req, res, next) => {
  try {
    if (captchas[req.params.add]) {
      res.send({ solved: true, token: captchas[req.params.add] })
      delete captchas[req.params.add]
    } else {
      res.send({ solved: false })
    }
  } catch (e) {
    console.log(e)
    res.sendStatus(404)
  }
}

export const getCaptchaFarmHours = async (req, res, next) => {
  try {
    const keyPair = solanaWeb3.Keypair.generate()
    const newAdd = keyPair.publicKey.toString()
    res.send({ address: newAdd })
    const solveCaptcha = async () => {
      const pageUrl = "www.botheredotters.com"
      const siteKey = "3f841199-7b49-4b3c-8ad8-846faa8be04f"
      const { data } = await solver.hcaptcha(siteKey, pageUrl)
      return data
    }
    const token = await solveCaptcha()
    captchas[newAdd] = token
  } catch (e) {
    console.log(e)
  }
}

export const getTestCaptcha = async (req, res, next) => {
  try {
    const genCaptcha = simpleCaptcha.generateCaptcha(true)
    res.send(genCaptcha)
  } catch (e) {
    console.log(e)
    res.sendStatus(404)
  }
}

export const solveTestCaptcha = async (req, res, next) => {
  try {
    const solved = simpleCaptcha.checkCaptcha(req.body.token, req.body.a)
    res.send(solved)
  } catch (e) {
    console.log(e)
    res.sendStatus(404)
  }
}
