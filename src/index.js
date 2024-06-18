const express = require('express') // express js
const path = require('path') // thư viện xử lý đường dẫn 
const exphbs  = require('express-handlebars')// html 
const route = require('./routes') // xử lý đường dẫn 
const methodOverride = require('method-override')// ghi đè phương thức



const app = express()
const port = 996


// middleware xử lý form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')));
app.get('/img/:folderName/:imageName', (req, res) => {
  const folderName = req.params.folderName;
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, 'public/img', folderName, imageName);
  res.sendFile(imagePath, (err) => {
      if (err) {
          res.status(404).send('Image not found');
      }
  });
});
// template engine
app.engine('handlebars', exphbs({
  helpers: {sum: (a, b) => a + b,}
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})