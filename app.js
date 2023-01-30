import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import initMongoDBConnection from './api/config/mongoose.js'
import ActorRoutes from './api/routes/ActorRoutes.js'
import BookingRoutes from './api/routes/BookingRoutes.js'
import TripRoutes from './api/routes/TripRoutes.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 8080
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

ActorRoutes(app)
BookingRoutes(app)
TripRoutes(app)

try{
  await initMongoDBConnection()
  app.listen(port, function () {
    console.log('ACME-Explorer RESTful API server started on: ' + port)
  })
}
catch(err){
  console.error('ACME-Explorer RESTful API could not connect to DB ' + err)
}