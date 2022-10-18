const express = require('express')
const { verifyAccessToken } = require('../../helpers/jwt_helper')
const { checkPermission } = require('../../helpers/perm_checker')
const router = express.Router()
const { City } = require('../../models/CityModel')
const { Column } = require('../../models/ColumnModel')

router.get('/cities', async (req, res, next) => {
    res.status(200).json(await City.find().select('-_id'))
})



/*
    COLUMN REQUESTS
*/

router.get('/columns', async (req, res, next) => {
    res.status(200).json(await Column.find().select('-_id -__v'))
})

router.delete('/columns', verifyAccessToken, checkPermission({ perms: { modifyColumns: true } }), async (req, res, next) => {
    const { name } = req.body
    try {
        if (!name) throw ('Geçersiz istek')
        let found = await Column.findOneAndRemove({ name: name })
        if (!found) throw ('Belirtilen obje mevcut değil')
        res.status(200).json({ message: `${found.name} silindi` })
    }
    catch (err) {
        console.log("Bir hata oluştu", err)
        res.status(400).json({ error: true, message: "Bir hata oluştu!", reason: err.message ? err.message : err })
    }

})

router.put('/columns', verifyAccessToken, checkPermission({ perms: { modifyColumns: true } }), async (req, res, next) => {
    const { name } = req.body
    try {
        if (!name) throw ('Geçersiz istek')
        let isExists = await Column.findOne({ name: name })
        if (isExists) throw ('Belirtilen obje zaten mevcut')
        const col = new Column({ name: name })
        const savedCol = await col.save()
        res.status(200).json({ message: `${savedCol.name} eklendi` })
    }
    catch (err) {
        console.log("Bir hata oluştu", err)
        res.status(400).json({ error: true, message: "Bir hata oluştu!", reason: err.message ? err.message : err })
    }
})


router.patch('/columns', verifyAccessToken, checkPermission({ perms: { modifyColumns: true } }), async (req, res, next) => {
    const { oldName, newName } = req.body
    try {
        if (!oldName || !newName) throw ('Eksik parametre')
        let foundCol = await Column.findOne({ name: oldName })
        if (!foundCol) throw ('Belirtilen sütun bulunamadı')

        foundCol.name = newName
        foundCol.save()

        //const savedCol = await col.save()
        res.status(200).json({ message: `Düzenleme başarılı` })
    }
    catch (err) {
        console.log("Bir hata oluştu", err)
        res.status(400).json({ error: true, message: "Bir hata oluştu!", reason: err.message ? err.message : err })
    }
})


router.post('/columns', verifyAccessToken, checkPermission({ perms: { modifyColumns: true } }), async (req, res, next) => {
    const { items } = req.body
    try {
        if (!items) throw ('Geçersiz istek')
        await Column.deleteMany({})
        const savedCols = await Column.insertMany(items)
        //const savedCols = await col.save()
        res.status(200).json({ message: `Objeler eklendi` })
    }
    catch (err) {
        console.log("Bir hata oluştu", err)
        res.status(400).json({ error: true, message: "Bir hata oluştu!", reason: err.message ? err.message : err })
    }
})

module.exports = router