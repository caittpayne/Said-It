module.exports = {
  init(app) {
    const staticRoutes = require('../routes/static');
    const marcoPolo = require('../routes/marco');
    const about = require('../routes/about');
    const topicRoutes = require('../routes/topics');
    const advertisementRoutes = require('../routes/advertisements');
    const postRoutes = require('../routes/posts');
    const flairRoutes = require('../routes/flairs');
    const userRoutes = require('../routes/users');
    app.use(staticRoutes);
    app.use(marcoPolo);
    app.use(about);
    app.use(topicRoutes);
    app.use(postRoutes);
    app.use(flairRoutes);
    app.use(advertisementRoutes);
    app.use(userRoutes);
  }
}
