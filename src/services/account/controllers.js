import AccountModel from "../../models/account.js"

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
    res.send(jobs)
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
