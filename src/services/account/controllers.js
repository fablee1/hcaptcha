import AccountModel from "../../models/account.js"
import { accSnapshot } from "./accs.js"
import sha256 from "simple-sha256"

export const addAccount = async (req, res, next) => {
  try {
    const newAccountData = {
      ...req.body,
    }
    const newAccount = new AccountModel(newAccountData)
    await newAccount.save()

    res.sendStatus(201)
  } catch (e) {
    console.log(e)
    res.sendStatus(400)
  }
}

export const updateAccount = async (req, res, next) => {
  const body = req.body
  let update
  try {
    if ("failed" in body) {
      update = body
    } else if (body?.expiresAt) {
      update = body
    } else {
      update = {
        expiresAt: body.currentOffer.expires_at,
        total_gifts: body.currentOffer.sol_gifts,
        time: body.info.total_minutes,
        referrals: body.info.total_referrals,
        discord: body.info.discord_id ? true : false,
        approved_referrals: body.referrals.length,
        total_tickets: body.info.total_tickets,
      }
    }
    const updatedAccount = await AccountModel.findOneAndUpdate(
      {
        address: req.params.add,
      },
      update,
      { new: true }
    )
    if (!updatedAccount) return res.sendStatus(404)
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.sendStatus(404)
  }
}

export const getAllAccounts = async (req, res, next) => {
  try {
    const allAccs = await AccountModel.find({})
    res.send(allAccs)
  } catch (e) {
    console.log(e)
    res.sendStatus(400)
  }
}

export const getJobs = async (req, res, next) => {
  try {
    const jobs = await AccountModel.find({
      expiresAt: { $lte: new Date() },
      failed: false,
    }).limit(10)

    const jobsAsObjects = jobs.map((j) => j.toObject())
    const result = jobsAsObjects.map((j) => {
      return {
        ...j,
        auth: sha256.sync(j.address.substring(0, 5) + j.tw.substring(0, 5)),
      }
    })
    res.send(result)
  } catch (e) {
    console.log(e)
    res.sendStatus(400)
  }
}

export const updateTwitter = async (req, res, next) => {
  const body = req.body
  try {
    const updatedAccount = await AccountModel.findOneAndUpdate(
      {
        address: req.params.add,
      },
      { twitter: body.twitter },
      { new: true }
    )
    if (!updatedAccount) return res.sendStatus(404)
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.sendStatus(404)
  }
}

export const findBannedAccs = async (req, res, next) => {
  try {
    accSnapshot.forEach(async (acc) => {
      const foundAcc = await AccountModel.findOne({ _id: acc._id.$oid })
      if (foundAcc) {
        if (foundAcc.total_gifts === acc.total_gifts) {
          await AccountModel.findOneAndUpdate(
            { _id: acc._id.$oid },
            { $set: { failed: true } }
          )
        }
      }
    })
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.sendStatus(404)
  }
}
