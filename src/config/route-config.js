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
    const commentRoutes = require('../routes/comments');
    const voteRoutes = require('../routes/votes');

    if(process.env.NODE_ENV === 'test') {
      const mockAuth = require('../../spec/support/mock-auth.js');
      mockAuth.fakeIt(app);
    }

    app.use(staticRoutes);
    app.use(marcoPolo);
    app.use(about);
    app.use(topicRoutes);
    app.use(postRoutes);
    app.use(flairRoutes);
    app.use(advertisementRoutes);
    app.use(userRoutes);
    app.use(commentRoutes);
    app.use(voteRoutes);
  }
}
