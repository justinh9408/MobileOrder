'use strict';
module.exports = function(app) {
    var memberRoute = require('./routes/memberRoute');
    memberRoute(app);

    var userRoute = require('./routes/userRoute');
    userRoute(app);

    var rstRoute = require('./routes/rstRoute');
    rstRoute(app);

    var catRoute = require('./routes/categoryRoute');
    catRoute(app);

    var miRoute = require('./routes/menuItemRoute');
    miRoute(app);

    var fileRoute = require('./routes/fileRoute');
    fileRoute(app);
};