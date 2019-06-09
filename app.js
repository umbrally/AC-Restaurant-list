// require packages used in project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting

// setting main page route
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// setting detail page route
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => { return restaurant.id.toString() === req.params.restaurant_id })
  res.render('show', { restaurant: restaurant })
})


// setting search results route
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const regExp = new RegExp(keyword, 'i')
  const restaurants = restaurantList.results.filter(restaurant => {
    return regExp.test(restaurant.name) || regExp.test(restaurant.category) || regExp.test(restaurant.location)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})