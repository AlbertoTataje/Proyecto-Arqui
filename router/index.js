'use strict'

const path = require('path')
const course = require('course')
const st = require('st')
const fs = require('fs')

const router = course()

//enrutador no estatico
const mount = st({
  path: path.join(__dirname, '..', 'public'),
  index: 'index.html',
  passthrough: true
})


router.get('/productos', function (req, res) {
    
    //envia el json
  let index = path.join(__dirname, '..', 'json/productos.json')
  let rs = fs.createReadStream(index)

  res.setHeader('Content-Type', 'application/json')
  rs.pipe(res)

  rs.on('error', function (err) {
    res.setHeader('Content-Type', 'application/json')
    res.end(err.message)
  })

})

function onRequest (req, res) {
  if (req.url.startsWith('/socket.io')) return

  mount(req, res, function (err) {
    if (err) return fail(err, res)

    router(req, res, function (err) {
      if (err) return fail(err, res)

      res.statusCode = 404
      res.end(`404 No Encontrado:  ${req.url}`)
    })
  })
}

function fail (err, res) {
  res.statusCode = 500
  res.setHeader('Content-Type', 'application/json')
  res.end(err.message)
}

module.exports = onRequest
