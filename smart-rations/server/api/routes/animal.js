const express = require('express')
const router = express.Router()
const { User } = require('../../models/UserModel')
const { verifyAccessToken } = require('../../helpers/jwt_helper')
const { Ranch } = require('../../models/RanchModel')
const { Animal } = require('../../models/AnimalModel')
// Animal
router.post('/animal', verifyAccessToken, async (req, res, next) => {
    try {
        const { userID } = req.payload
        //const { RanchID, Type = "LactingCow", Breed = "Jersey", Age = 0, BodyWeight = 0, DaysPregnant = 0, ConditionScore = 0, DaysInMilk = 0, LactationNumber = 0, AgeAtFirstCalving = 0, CalvingInterval = 0, MilkProduction = 0, MilkFat = 0, MilkProtein = 0, Lactose = 0 } = req.body
        //const filter = { RanchID, Type, Breed, Age, AgeAtFirstCalving, BodyWeight, CalfBirthW, CalfTemp, CalvingInterval, ConditionScore, DaysInMilk, DaysPregnant, DesiredADG, LactationNumber, Lactose, MatureWeight, MilkFat, MilkProduction, MilkProtein }
        const { RanchID, Type, Breed, Age, AgeAtFirstCalving, BodyWeight, CalfBirthW, CalfTemp, CalvingInterval, ConditionScore, DaysInMilk, DaysPregnant, DesiredADG, LactationNumber, Lactose, MatureWeight, MilkFat, MilkProduction, MilkProtein } = req.body

        const user = await User.findOne({ _id: userID })
        if (!user) throw 'Kullanıcı bulunamadı'
        let userFarm = await Ranch.findOne({ OwnerID: user._id, _id: RanchID })
        if (!userFarm) throw 'Çiftlik bulunamadı'

        const createAnimal = new Animal({ OwnerID: user._id, RanchID, Type, Breed, Age, AgeAtFirstCalving, BodyWeight, CalfBirthW, CalfTemp, CalvingInterval, ConditionScore, DaysInMilk, DaysPregnant, DesiredADG, LactationNumber, Lactose, MatureWeight, MilkFat, MilkProduction, MilkProtein })

        await Animal.validate(createAnimal)
        const savedAnimal = await createAnimal.save()
        res.send(savedAnimal)
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ error: true, message: e.message ?? e })
    }
})

router.put('/animal', verifyAccessToken, async (req, res, next) => {
    try {
        const { userID } = req.payload
        const { _id, RanchID, Type, Breed, Age, AgeAtFirstCalving, BodyWeight, CalfBirthW, CalfTemp, CalvingInterval, ConditionScore, DaysInMilk, DaysPregnant, DesiredADG, LactationNumber, Lactose, MatureWeight, MilkFat, MilkProduction, MilkProtein } = req.body
        const filter = { _id, RanchID, Type, Breed, Age, AgeAtFirstCalving, BodyWeight, CalfBirthW, CalfTemp, CalvingInterval, ConditionScore, DaysInMilk, DaysPregnant, DesiredADG, LactationNumber, Lactose, MatureWeight, MilkFat, MilkProduction, MilkProtein }
        const user = await User.findOne({ _id: userID })
        if (!user) throw 'Kullanıcı bulunamadı'
        let userFarm = await Ranch.findOne({ OwnerID: user._id, _id: RanchID })
        if (!userFarm) throw 'Çiftlik bulunamadı'
        await Animal.validate({ _id: _id, OwnerID: user._id, ...filter })
        const animal = await Animal.findOneAndUpdate({ _id: _id, OwnerID: user._id }, filter, { new: true })
        if (!animal) throw 'Hayvan bulunamadı'
        res.send(animal)
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ error: true, message: e.message ?? e })
    }
})

router.get('/animal', verifyAccessToken, async (req, res, next) => {
    try {
        if (!req.query.ranchID) throw 'RanchID belirtmeniz gerekiyor!'
        const { userID } = req.payload
        const user = await User.findOne({ _id: userID })
        if (!user) throw 'Kullanıcı bulunamadı'
        const userFarm = await Ranch.findOne({ OwnerID: user._id, _id: req.query.ranchID })
        if (!userFarm) throw 'Bu IDye sahip bir çiftlik bulunamadı'
        const animals = await Animal.find({ RanchID: userFarm._id })
        res.status(200).send(animals)
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ error: true, message: e })
    }
})

router.get('/animals', verifyAccessToken, async (req, res, next) => {
    try {
        const { userID } = req.payload
        const user = await User.findOne({ _id: userID })
        if (!user) throw 'Kullanıcı bulunamadı'
        const animals = await Animal.find({ OwnerID: user._id })
        res.status(200).send(animals)
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ error: true, message: e })
    }
})

router.delete('/animal', verifyAccessToken, async (req, res, next) => {
    try {
        const { userID } = req.payload
        const { AnimalID } = req.body
        if (!AnimalID) throw 'Animal ID belirtilmemiş'
        const user = await User.findOne({ _id: userID })
        if (!user) throw 'Kullanıcı bulunamadı'
        const animal = Animal.findById(AnimalID)
        if (!animal) throw 'Belirttiğiniz IDye ait hayvan bulunamadı'
        await Animal.deleteOne(animal)
        res.send({ message: "Hayvan silindi" })
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ error: true, message: e })
    }
})


module.exports = router