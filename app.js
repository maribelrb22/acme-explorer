import fs from 'fs'
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { initDataWarehouseCronJob } from './api/services/DataWarehouseCronJobService.js'
import initMongoDBConnection from './api/config/mongoose.js'
import versionedRoutes from './api/middlewares/VersionedRoutes.js'
import v1 from './api/routes/v1.js'
import v2 from './api/routes/v2.js'
import admin from 'firebase-admin'
import { readFile } from 'fs/promises'

dotenv.config()

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ACME Explorer API',
    version: 'v1',
    description:
      'This is a REST API application made with Express.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./api/api-doc/*.js','./api/routes/*.js', './api/models/*.js', ],
}

const swaggerSpec = swaggerJSDoc(options);

const app = express()
const port = process.env.PORT || 8080
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, idToken, X-API-Version') // ojo, que si metemos un parametro propio por la cabecera hay que declararlo aquí para que no de el error CORS
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
  next()
})

var serviceAccount = JSON.parse(await readFile('./api/config/acme-explorer.json', 'utf8'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://acme-explorer-e1e36-default-rtdb.europe-west1.firebasedatabase.app/'
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(versionedRoutes(['v1', 'v2']))
app.use('/v1', v1)
app.use('/v2', v2)

try{
  await initMongoDBConnection()
  app.listen(port, function () {
    console.log('ACME-Explorer RESTful API server started on: ' + port)
  })
}
catch(err){
  console.error('ACME-Explorer RESTful API could not connect to DB ' + err)
}


initDataWarehouseCronJob()

export { app}