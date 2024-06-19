class NewsController {
    index(req, res, next) {
        res.render('news');
    }
}
module.exports = new NewsController();
