const express = require('express')
const router = express.Router()
const { User } = require('../../models/UserModel')
const { verifyAccessToken } = require('../../helpers/jwt_helper')
const { Ranch } = require('../../models/RanchModel')
const { Animal } = require('../../models/AnimalModel')

router.post('/ranch', verifyAccessToken, async (req, res, next) => {
    try {
        const { userID } = req.payload
        const { Name, Temperature = 20, PrevTemperature, WindSpeed, Distance, Topography = "Flat", Trips, HairDepth, CoatCondition = "Clean", HeatStress = "None", Grazing = false, NightCooling = false } = req.body
        if (!Name) throw 'Bir isim belirlemeniz gerekiyor'
        const user = await User.findOne({ _id: userID })
        if (!user) throw 'Kullanıcı bulunamadı'
        let userFarms = await Ranch.findOne({ OwnerID: user._id, Name: Name })
        if (userFarms) throw 'Bu isim kullanılmakta'
        userFarms = await Ranch.find({ OwnerID: user._id })
        if (userFarms?.length >= 4) throw 'Çiftlik sınırına ulaştınız'

        const createRanch = new Ranch({ OwnerID: user._id, Name, Temperature, CoatCondition, HeatStress, Grazing, NightCooling, PrevTemperature, WindSpeed, Distance, Topography, Trips, HairDepth })
        const savedRanch = await createRanch.save()
        res.send(savedRanch)
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ error: true, message: e })
    }
})


router.get('/ranch', verifyAccessToken, async (req, res, next) => {
    try {
        const { userID } = req.payload
        const user = await User.findOne({ _id: userID })
        if (!user) throw 'Kullanıcı bulunamadı'
        const userRanches = await Ranch.find({ OwnerID: user._id }).lean()
        if (req.query.AnimalCount == 1) {
            let promises = []
            for (let ranch of userRanches) {
                ranch.AnimalCount = new Promise(async (resolve, reject) => {
                    const animals = await Animal.find({ RanchID: ranch._id })
                    ranch['AnimalCount'] = animals.length
                    resolve(animals.length)
                })
                promises.push(ranch.AnimalCount)
            }
            Promise.all(promises).then(() => {
                res.send(userRanches)
            })
        }
        else
            res.send(userRanches)
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ error: true, message: e })
    }
})

router.put('/ranch', verifyAccessToken, async (req, res, next) => {
    try {
        const { userID } = req.payload
        const { Name, Temperature, PrevTemperature, WindSpeed, Distance, Topography, Trips, HairDepth, CoatCondition, HeatStress, Grazing, NightCooling, _id } = req.body

        if (!Name) throw 'Bir isim belirlemeniz gerekiyor'
        const user = await User.findOne({ _id: userID })
        if (!user) throw 'Kullanıcı bulunamadı'

        await Ranch.validate({ OwnerID: user._id, Name: Name, Temperature: Temperature, PrevTemperature: PrevTemperature, WindSpeed: WindSpeed, Distance: Distance, Topography: Topography, Trips: Trips, HairDepth: HairDepth, CoatCondition: CoatCondition, HeatStress: HeatStress, Grazing: Grazing, NightCooling: NightCooling }).catch(e => { throw e.message })

        let ranch = await Ranch.findOne({ OwnerID: user._id, _id: _id })
        if (!ranch) throw `Bu ID'ye sahip çiftlik bulunamadı`

        Object.assign(ranch, { Name: Name, Temperature: Temperature, PrevTemperature: PrevTemperature, WindSpeed: WindSpeed, Distance: Distance, Topography: Topography, Trips: Trips, HairDepth: HairDepth, CoatCondition: CoatCondition, HeatStress: HeatStress, Grazing: Grazing, NightCooling: NightCooling })
        await ranch.save()
        res.send({ ranch, message: 'Düzenleme başarılı' })
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ error: true, message: e })
    }
})

router.delete('/ranch', verifyAccessToken, async (req, res, next) => {
    try {
        const { userID } = req.payload
        const { id } = req.body
        if (!id) throw 'Ranch ID belirtilmemiş'
        const user = await User.findOne({ _id: userID })
        if (!user) throw 'Kullanıcı bulunamadı'
        const ranch = await Ranch.findOne({ OwnerID: user._id, _id: id })
        if (!ranch) throw 'Ranch bulunamadı'
        await Ranch.deleteOne(ranch)
        await Animal.deleteMany({ OwnerID: userID, RanchID: ranch._id })
        res.send({ message: "Çiftlik ve hayvanlar silindi" })
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ error: true, message: e })
    }
})

module.exports = router