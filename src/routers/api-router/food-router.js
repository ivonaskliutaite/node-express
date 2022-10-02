const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  update,
  remove,
} = require('../../controllers/food-controller');

const foodRouter = Router();

foodRouter.get('/', fetchAll);

foodRouter.get('/:id', fetch);

foodRouter.post('/', create);

foodRouter.patch('/:id', update);

foodRouter.delete('/:id', remove);

module.exports = foodRouter;
