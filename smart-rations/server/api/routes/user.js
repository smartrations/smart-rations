const express = require('express')
const router = express.Router()
const { User, validateUserSchema, validateUserLoginSchema } = require('../../models/UserModel')
const { signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken } = require('../../helpers/jwt_helper')
const { userPerms } = require('../../models/UserPermission')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET'
    })
})

router.get('/check', verifyAccessToken, async (req, res, next) => {
    try {
        const { userID, token } = req.payload
        const user = await User.findOne({ _id: userID })
        res.send({ message: 'OK', id: user._id, name: user.name, surname: user.surname, token: token })
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: true, message: "Bir hata oluştu!" })
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const { email, password, name, surname } = req.body
        if (!email || !password || !name || !surname) throw ('BAD REQUEST')
        const result = await validateUserSchema.validateAsync(req.body)
        // Hata kontrol
        const existsMail = await User.findOne({ email: result.email })
        if (existsMail) throw ('Bu mail zaten kayıtlı')

        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)
        res.send({ code: '200', id: user._id, name: user.name, surname: user.surname, message: 'Kayıt Başarılı', token: accessToken })


    } catch (err) {
        console.log("Bir hata oluştu", err)
        return res.status(400).send({ error: true, message: err.message ?? err })
    }
})


router.post('/login', async (req, res, next) => {
    try {
        const { password, email } = req.body
        if (!password || !email) throw (`BAD REQUEST ${JSON.stringify(req.body)}`)
        const result = await validateUserLoginSchema.validateAsync(req.body)
        const user = await User.findOne({ email: result.email })
        if (!user) throw ('Bu bilgilere sahip bir kullanıcı bulunamadı!')

        const isMatch = await user.checkPassword(result.password)
        if (!isMatch) throw ('Geçersiz kullanıcı/şifre')

        const accessToken = await signAccessToken(user.id)
        const perm = await userPerms.findOne({ userID: user._id })
        res.send({ code: '200', id: user._id, name: user.name, surname: user.surname, token: accessToken, role: perm?.role ?? "DEFAULT" })

    } catch (err) {
        console.log('Login sırasında hata', err)
        return res.status(400).send({ error: true, message: err.message ?? err })
    }
})

router.post('/refreshtoken', async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw ('Bad Request')
        const userid = await verifyRefreshToken(refreshToken)
        const accessToken = await signAccessToken(userid)
        const refToken = await signRefreshToken(userid)
        res.send({ accessToken, refToken })

    } catch (err) {
        next(err)
    }
})


module.exports = router