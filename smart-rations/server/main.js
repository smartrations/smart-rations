const fs = require('fs')
const https = require('https')
const http = require('http')
const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

mongoose.connect(
  process.env.DB_CONNECT, { useNewUrlParser: true })
  .then(result => console.log('DB Bağlantısı kuruldu'))
  .catch(e => console.log(`DB bağlantısında bir hata oluştu ${e}`))


const options = {
  key: fs.readFileSync('./crtlocal/localhost.key'),
  cert: fs.readFileSync('./crtlocal/localhost.crt')
}


const httpsServer = https.createServer(options, app)
const httpServer = http.createServer(options, app)


httpsServer.listen(2096, () => console.log(`[${new Date().toLocaleTimeString()}] ` + 'HTTPS Sunucu başlatıldı'))
httpServer.listen(2095, () => console.log(`[${new Date().toLocaleTimeString()}] ` + 'HTTP Sunucu başlatıldı'))

