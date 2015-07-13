const io = require('socket.io-client')
const xhr = require('xhr')

const socket = io.connect()


mandar.addEventListener('click', function (e) {
  e.preventDefault()
  //probar ajax
  xhr({
      uri: '/productos',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images: frames }),
    }, function (err, res, body) {
      if (err) return logError(err)

      console.log(JSON.parse(body))
    })

}, false)

function logError (err) {
  console.error(err)
}


socket.on('message', function (messages) {
    console.log(messages)  
})
