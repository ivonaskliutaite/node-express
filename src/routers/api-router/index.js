const { Router } = require('express');
const categoriesRouter = require('./categories-router');
const foodRouter = require('./food-router');

const apiRouter = Router();

apiRouter.use('/food', foodRouter);
apiRouter.use('/categories', categoriesRouter);

module.exports = apiRouter;