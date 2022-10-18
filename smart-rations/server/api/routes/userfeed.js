const express = require('express')
const { verifyAccessToken } = require('../../helpers/jwt_helper')
const { Feed } = require('../../models/FeedModel')
const { UserFeed } = require('../../models/UserFeedModel')
const { User } = require('../../models/UserModel')
const router = express.Router()

router.post('/ufeed', verifyAccessToken, async (req, res, next) => {
    const { userID } = req.payload
    const { _id, DMFed = 0, Price = 0 } = req.body
    try {
        const user = await User.findOne({ _id: userID })
        if (!user) throw 'Kullanıcı bulunamadı'
        const feed = await Feed.findOne({ _id: _id })
        if (!feed) throw 'Yem bulunamadı'

        const ufeed = await UserFeed.findOne({ UserID: userID, FeedID: _id })
        if (!ufeed) {
            const newUfeed = new UserFeed({
                UserID: userID,
                FeedID: _id,
                DMFed: DMFed,
                Price: Price
            })
            await newUfeed.save()
            return res.status(200).json({ message: `Yem eklendi`, newUfeed })
        }
        ufeed.DMFed = DMFed
        ufeed.Price = Price
        await ufeed.save()

        res.status(200).json({ message: `Yem düzenlendi`, ufeed })
    }
    catch (err) {
        console.log("Bir hata oluştu", err)
        res.status(400).json({ error: true, message: err.message ?? err })
    }
}
)



module.exports = router