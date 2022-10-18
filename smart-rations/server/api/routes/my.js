const express = require('express')
const Calculate = require('../../df/calculate')
const { verifyAccessToken } = require('../../helpers/jwt_helper')
const { Animal } = require('../../models/AnimalModel')
const { Column } = require('../../models/ColumnModel')
const { FeedCategory } = require('../../models/FeedCategoryModel')
const { Feed } = require('../../models/FeedModel')
const { Ranch } = require('../../models/RanchModel')
const { SelectedFeed } = require('../../models/SelectedFeedModel')
const { UserFeed } = require('../../models/UserFeedModel')
const { User } = require('../../models/UserModel')
const router = express.Router()


router.get('/feeds', verifyAccessToken, async (req, res, next) => {
    try {
        const { userID } = req.payload
        const uFeeds = await UserFeed.find({ UserID: userID })
        const feeds = await Feed.find({ UserID: null })

        const userFeeds = await Feed.find({ UserID: userID })

        uFeeds.forEach(f => {
            const find = feeds.find(a => a._id == f.FeedID)
            if (find) {
                find.DMFed = f.DMFed
                find.Price = f.Price
            }
        })

        const allFeeds = [...userFeeds, ...feeds]

        res.status(200).json(allFeeds)
    }
    catch (err) {
        console.log("Bir hata oluştu", err)
        res.status(400).json({ error: true, message: err.message ?? err })
    }
})

router.post('/sfeeds', verifyAccessToken, async (req, res, next) => {
    try {
        const { userID } = req.payload
        const { feedsID } = req.body
        if (!feedsID) throw 'Lütfen bir yem seçiniz'

        const user = await User.findOne({ _id: userID })
        if (!user) throw 'Kullanıcı bulunamadı'

        const feeds = await Feed.find({ '_id': { $in: feedsID } })
        if (feeds.length != feedsID.length) throw 'Bazı yemler mevcut değil'
        update = { feeds: feedsID }
        options = { upsert: true, new: true, setDefaultsOnInsert: true }

        const savedSFeed = await SelectedFeed.findOneAndUpdate({ UserID: userID }, update, options)

        res.status(200).json(savedSFeed)
    }
    catch (err) {
        console.log("Bir hata oluştu", err)
        res.status(400).json({ error: true, message: err.message ?? err })
    }
})

router.get('/sfeeds', verifyAccessToken, async (req, res, next) => {
    try {
        const { userID } = req.payload
        const sfeeds = await SelectedFeed.findOne({ UserID: userID })
        const feeds = await Feed.find({ '_id': { $in: sfeeds?.feeds } })
        const uFeeds = await UserFeed.find({ UserID: userID })
        uFeeds.forEach(f => {
            const find = feeds.find(a => a._id == f.FeedID)
            if (find) {
                find.DMFed = f.DMFed
                find.Price = f.Price
            }
        })
        res.status(200).json(feeds)
    }
    catch (err) {
        console.log("Bir hata oluştu", err)
        res.status(400).json({ error: true, message: err.message ?? err })
    }
})

router.delete('/feed', verifyAccessToken, async (req, res, next) => {
    const { userID } = req.payload
    const { id } = req.body
    try {
        const feed = await Feed.findOne({ _id: id, UserID: userID })
        if (!feed) throw 'Yem bulunamadı'
        await feed.remove()
        res.status(200).json({ message: "Yem silindi" })
    }
    catch (err) {
        console.log("Bir hata oluştu", err)
        res.status(400).json({ error: true, message: err.message ?? err })
    }
})

router.post('/feed', verifyAccessToken, async (req, res, next) => {
    const { userID } = req.payload
    // Category: ID
    const { Name, Price = 0, City = 0, data, DMFed, Category, EnergyEqClass, ForageDescrp, IFN } = req.body
    try {
        if (!Name || !data || !Category) throw ('Geçersiz istek')
        if (Object.keys(data).length === 0) throw ('Data boş olamaz')
        const isExists = await Feed.findOne({ Name: Name })
        if (isExists) throw ('Belirtilen yem zaten mevcut')
        const cate = await FeedCategory.findOne({ _id: Category })
        if (!cate) throw ('Kategori bulunamadı')

        const columns = await Column.find()

        let cols = new Map()
        let toSave = []

        columns.map(col => cols.set(col.name, null))

        for (let d in data) {
            if (cols.has(d))
                cols.set(d, data[d])
            else
                throw (`Belirtilen sütun sistemde bulunamadı (${d})`)
        }

        for (let [key, value] of cols) {
            toSave.push({ name: key, value: value ?? 0 })
        }
        const feed = new Feed({ Name, Price, Category, City, DMFed, EnergyEqClass, ForageDescrp, IFN, data: toSave, UserID: userID })

        await feed.save()
        res.status(200).json({ message: `Yem Eklendi`, feed })
    }
    catch (err) {
        console.log("Bir hata oluştu", err)
        res.status(400).json({ error: true, message: err.message ?? err })
    }
})

router.put('/feed', verifyAccessToken, async (req, res, next) => {
    const { userID } = req.payload
    const { id, Name, Price, City, DMFed, data, Category, EnergyEqClass, ForageDescrp, IFN } = req.body
    try {
        if (!id) throw ('Geçersiz istek')
        const feed = await Feed.findOne({ _id: id, UserID: userID })
        if (!feed) throw ('Yem bulunamadı')

        const columns = await Column.find()

        let cols = new Map()
        let toSave = []

        columns.map(col => cols.set(col.name, null))

        for (let d in data) {
            if (cols.has(d))
                cols.set(d, data[d])
            else
                throw (`Belirtilen sütun sistemde bulunamadı (${d})`)
        }

        for (let [key, value] of cols) {
            toSave.push({ name: key, value: value ?? 0 })
        }
        feed.data = toSave
        if (Name) feed.Name = Name
        if (Price) feed.Price = Price
        if (City) feed.City = City
        if (DMFed) feed.DMFed = DMFed
        if (Category) feed.Category = Category
        if (EnergyEqClass) feed.EnergyEqClass = EnergyEqClass
        if (ForageDescrp) feed.ForageDescrp = ForageDescrp
        if (IFN) feed.IFN = IFN

        await feed.save()
        res.status(200).json({ message: `Yem güncellendi`, feed })
    }
    catch (err) {
        console.log("Bir hata oluştu", err)
        res.status(400).json({ error: true, message: err.message ?? err })
    }
})

router.get('/feedcategories', async (req, res, next) => {
    try {
        const categories = await FeedCategory.find({})
        res.status(200).json(categories)
    }
    catch (err) {
        console.log("Bir hata oluştu", err)
        res.status(400).json({ error: true, message: err.message ?? err })
    }
})

router.post('/calculate', verifyAccessToken, async (req, res, next) => {
    try {
        const { userID } = req.payload
        const { AnimalID, RanchID } = req.body

        if (!AnimalID || !RanchID) throw ('Hayvan veya çiftlik belirtilmemiş')
        const user = await User.findOne({ _id: userID })
        if (!user) throw 'Kullanıcı bulunamadı'
        const animal = await Animal.findOne({ OwnerID: user._id, _id: AnimalID })
        if (!animal) throw 'Hayvan bulunamadı'
        const env = await Ranch.findOne({ OwnerID: user._id, _id: RanchID })
        if (!env) throw 'Çiftlik bulunamadı'

        const sfeeds = await SelectedFeed.findOne({ UserID: userID })
        if (!sfeeds) throw 'Önce yem seçmeniz gerekli'
        const feeds = await Feed.find({ '_id': { $in: sfeeds.feeds } })
        const fcats = await FeedCategory.find({})
        if (!fcats.length || !feeds.length || !sfeeds) throw 'Gerekli bilgilerden en az biri bulunamadı'
        const uFeeds = await UserFeed.find({ UserID: userID })
        uFeeds.forEach(f => {
            const find = feeds.find(a => a._id == f.FeedID)
            if (find) {
                find.DMFed = f.DMFed
                find.Price = f.Price
            }
        })
        feeds.map(a => a.Category = fcats.find(b => b._id == a.Category).name)


        const test = new Calculate()
        test.setAnimal(animal)
        test.setEnvironment(env)
        test.setFeeds(feeds)

        const rt = test.optimize()

        res.status(200).send(req.query.all == '1' ? test : rt)
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ error: true, message: e })
    }
})
module.exports = router