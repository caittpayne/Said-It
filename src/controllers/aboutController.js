module.exports = {
  index(req, res, next) {
    res.render('about/index', {title: 'About'});
  }
}
