const express = require('express')
const app = express()
class Server {
  constructor (port) {
    this.port = port
  }

  async servercall () {
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`)
    })
  }
}

module.exports = Server
