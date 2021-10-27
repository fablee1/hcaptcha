const twitterLinks = []

export const getTwitter = async (req, res, next) => {
  try {
    const link = twitterLinks.shift()
    res.send({ link })
  } catch (e) {
    console.log(e)
  }
}

export const postTwitter = async (req, res, next) => {
  try {
    if (twitterLinks.length > 10) {
      twitterLinks.shift()
    }
    twitterLinks.push(req.body.link)
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
  }
}
