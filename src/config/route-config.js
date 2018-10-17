module.exports = {
  init(app) {
    const staticRoutes = require('../routes/static');
    const marcoPolo = require('../routes/marco');
    app.use(staticRoutes);
    app.use(marcoPolo);
  }
}
