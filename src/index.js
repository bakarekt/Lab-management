const express = require('express')
const path = require('path')
const exphbs  = require('express-handlebars');
const route = require('./routes')
const methodOverride = require('method-override')
const app = express()
const port = 999

// middleware xử lý form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')));


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})