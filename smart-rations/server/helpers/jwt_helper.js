const JWT = require('jsonwebtoken')

module.exports = {
    signAccessToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {
                //name: "sifreleme zimbirtisi"
                userID: userID
            }
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: '5d',
                issuer: 'cslab'
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) return reject(err)
                resolve(token)
            })
        })
    },
    verifyAccessToken: (req, res, next) => {
        const unauthorized = () => res.status(401).json({ message: 'Unauthorized Request' })
        if (!req.headers['authorization']) return unauthorized()
        const authHeader = req.headers['authorization']
        const token = authHeader.replace('Bearer ', '')

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') return unauthorized()
                else return res.status(500).json({ message: err.message })
            }
            req.payload = { ...payload, token: token }
            next()
        })
    },
    signRefreshToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {
                userID: userID
            }
            const secret = process.env.REFRESH_TOKEN_SECRET
            const options = {
                expiresIn: '5d',
                issuer: 'cslab'
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) return reject(err)
                resolve(token)
            })
        })
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) return reject('Unauthorized')
                const uid = payload.userID
                resolve(uid)
            })
        })
    }
}
