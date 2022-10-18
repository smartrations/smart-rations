const { userPerms } = require("../models/UserPermission")

const ROLE = {
    ADMIN: {
        friendlyName: "ADMIN",
        permissions: {
            modifyColumns: true,
            modifyCities: true,
            modifyFeeds: true,
            accessUsers: true
        }
    },
    EDITOR: {
        friendlyName: "EDITOR",
        permissions: {
            modifyColumns: true,
            modifyCities: false,
            modifyFeeds: true,
            accessUsers: true
        }
    }
}

const getRole = (roleName) => {
    for (const [key, value] of Object.entries(ROLE)) {
        if (value["friendlyName"] == roleName) return value.permissions
    }
    return null
}

const checkPermission = (reqPerms) => { // reqPerms role ve perms döndürüyor
    return (req, res, next) =>
        new Promise(async (resolve, reject) => {
            try {
                const { userID } = req.payload
                const user = await userPerms.findOne({ userID: userID })
                if (!user)
                    return res.status(403).json({ message: 'Permission required' }) // Permission bulunamazsa
                if (reqPerms?.role && (reqPerms.role.friendlyName != user.role))
                    return res.status(403).json({ message: 'Insufficient permission' }) // Grup permission yetersizse

                if (reqPerms?.perms && user.role) { // Sadece permission verildiyse ve kullanıcının grup permissionu varsa
                    const userRole = getRole(user.role)
                    for (const [key, value] of Object.entries(reqPerms.perms)) {
                        if (!value) continue
                        if (userRole[key] != true) return res.status(403).json({ message: 'Insufficient permission' }) // Permission yetersizse
                    }
                }

                next()
                return resolve('OK')
            } catch (err) {
                console.log("Beklenmedik hata! " + err.message)
                console.log(err)
                res.status(500).json({ message: 'Unknown error' })
                return resolve('ERROR')
            }
        })

}
module.exports = {
    ROLE,
    checkPermission
}