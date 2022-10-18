const express = require('express')
const { verifyAccessToken } = require('../../helpers/jwt_helper')
const { Column } = require('../../models/ColumnModel')
const router = express.Router()

router.get('/', verifyAccessToken, async (req, res, next) => {
    try {
        const columns = await Column.find()
        const cols = columns.map(col => col.name)
        res.status(200).json(cols)
    }
    catch (err) {
        console.log("Bir hata oluştu", err)
        res.status(400).json({ error: true, message: err.message ?? err })
    }
})
/* 
router.get('/update', async (req, res, next) => {

    const new2 = [
        'TDN', 'PAF', 'DE', 'DM', 'NDF',
        'ADF', 'Lignin', 'CP', 'NDFIP', 'ADFIP',
        'PrtA', 'PrtB', 'PrtC', 'Kd', 'RUPDigest',
        'Fat', 'Ash', 'Ca', 'CaBio', 'P',
        'PBio', 'Mg', 'MgBio', 'Cl', 'ClBio',
        'K', 'KBio', 'Na', 'NaBio', 'S',
        'SBio', 'Co', 'CoBio', 'Cu', 'CuBio',
        'I', 'IBio', 'Fe', 'FeBio', 'Mn',
        'MnBio', 'Se', 'SeBio', 'Zn', 'ZnBio',
        'Met', 'Lys', 'Arg', 'His', 'Ile',
        'Leu', 'Cys', 'Phe', 'Thr', 'Trp',
        'Val', 'VitA', 'VitD', 'VitE', 'NFCDigest',
        'NDFDigest', 'CPDigest', 'FatDigest'
    ]
    await Column.deleteMany({})

    await Column.insertMany(new2.map(a => ({ 'name': a })))
    const columns = await Column.find()
    const cols = columns.map(col => col.name)
    res.status(200).json(cols)
})
 */
module.exports = router