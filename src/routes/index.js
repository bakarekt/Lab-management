const siteRouter = require('./site')
const newsRouter = require('./news')
const studentsRouter = require('./students')
const projectRouter = require('./projects')
const groupsRouter = require('./groups')
function route(app) {
    app.use('/projects', projectRouter)
    app.use('/groups', groupsRouter)
    app.use('/students', studentsRouter)
    app.use('/news', newsRouter)
    app.use('/', siteRouter)
}
module.exports = route