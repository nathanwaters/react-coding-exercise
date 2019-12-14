import express from 'express'
import session from 'express-session'
import createMemoryStore from 'memorystore'
import ms from 'ms'

const router = express.Router()
const MemoryStore = createMemoryStore(session)

router.use(session({
  store: new MemoryStore({
    checkPeriod: ms(process.env.SESSION_PRUNE_PERIOD || '24h')
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

router.get('/', (req, res) => {
  res.json({
    success: true,
    results: {
      favourites: req.session.favourites || []
    }
  })
})

router.put('/:id', (req, res) => {
  const favourites = req.session.favourites = (req.session.favourites || [])
  const id = +req.params.id
  if (favourites.indexOf(id) < 0) {
    favourites.push(id)
  }

  res.json(favourites)
})

router.delete('/:id', (req, res) => {
  const favourites = req.session.favourites = (req.session.favourites || [])
  const id = +req.params.id
  const index = favourites.indexOf(id)
  if (index >= 0) {
    favourites.splice(index, 1)
  }

  res.json(favourites)
})

export default router
