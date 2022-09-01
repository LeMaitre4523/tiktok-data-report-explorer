const app = require('fastify')({ logger: false })
const bodyParser = require('body-parser');
const fs = require("fs");
var https = require('https')
var http = require('http').createServer(app)
const prod = false;
const path = require('path');
//const serveStatic = require('serve-static'); //Static
const port = 3000;

app.register(require('fastify-express'))
app.register(require('fastify-static'), {
  root: path.join(__dirname, '/assets'),
  prefix: '/assets/', // optional: default '/'
})


if (prod) {
  https.createServer({
    key: fs.readFileSync("./"),
    cert: fs.readFileSync("./"),
    ca: fs.readFileSync("./")
  }, app)
  https.listen(port, () => {
    console.log("[Loader/Https]", "TDRE lancé en mode production sur le port " + port)
  })
} else {
  app.listen(port, () => {
  	console.log("[Loader/Http]", "TDRE lancé en mode développement sur le port " + port)
  })
}

/* Rate limiter*/
app.register(require('fastify-rate-limit'), {
  max: 100,
  timeWindow: '1 minute'
})

app.setErrorHandler(function (error, req, reply) {
  if (reply.statusCode === 429) {
    error.message = 'Vous avez dépassé le nombre de requêtes par minutes.'
  }
  if (reply.statusCode === 500) {
    error.msg = 'Une erreur interne est survenue.'
	  console.log("[500]", `${req.method} ${req.url}`)
    console.log("[500]", error.stack)
  }
  reply.send(error)
})

app.register(require('./router.js'), {prefix: "/" })
app.setNotFoundHandler(function (req, res) { 
  res.code(404).send({ error: 'Not Found', message: 'Page non trouvé', statusCode: 404 }) 
  console.log("[404]", `${req.method} ${req.url}`)
})

process.on("uncaughtException", (err) => {
  console.log(err)
})
process.on("unhandledRejection", (err) => {
  console.log(err)
})
process.on("exit", (code) => {
  console.log("Process exited with code " + code)
})
