const siteRouter = require('./site')
const newsRouter = require('./news')
const studentsRouter = require('./students')
function route(app) {
    app.use('/students', studentsRouter)
    app.use('/news', newsRouter)
    app.use('/', siteRouter)
}

module.exports = route