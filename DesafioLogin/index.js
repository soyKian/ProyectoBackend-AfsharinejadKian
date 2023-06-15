import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { __dirname } from './path.js'
import usersRouter from './routes/user.router.js'
import './db/dbConfig.js'
import mongoStore from 'connect-mongo'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')

app.use(
    session({
      secret: 'sessionKey',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 10000
      },
      store: new mongoStore({
        mongoUrl: 'mongodb+srv://admin:test@cluster0.evgxseo.mongodb.net/ecommerce?retryWrites=true&w=majority',
        ttl: 10,
      }),
    })
  )

app.use('/users',usersRouter)
app.use('/views',viewsRouter)

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Conectado al puerto ${PORT} `)
})