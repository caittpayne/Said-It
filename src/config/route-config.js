module.exports = {
  init(app) {
    const staticRoutes = require('../routes/static');
    const marcoPolo = require('../routes/marco');
    const about = require('../routes/about');
    app.use(staticRoutes);
    app.use(marcoPolo);
    app.use(about);
  }
}
