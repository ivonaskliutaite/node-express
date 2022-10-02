const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const MenuModel = require('../models/food-model');

const createMenuNotFoundError = (menuId) => createNotFoundError(`Recipe with id '${menuId}' was not found`);

const fetchAll = async (req, res) => {
  const { joinBy } = req.query;

  try {
    const foodDocuments = joinBy === 'categoryId'
      ? await MenuModel.find().populate('categoryId')
      : await MenuModel.find();

    res.status(200).json(foodDocuments);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const menuId = req.params.id;
  const { joinBy } = req.query;

  try {
    const foundMenu = joinBy === 'categoryId'
      ? await MenuModel.findById(menuId).populate('categoryId')
      : await MenuModel.findById(menuId);
    if (foundMenu === null) throw createMenuNotFoundError(menuId);

    res.status(200).json(foundMenu);
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newFoodData = req.body;

  try {
    MenuModel.validate(newFoodData);

    const newMenu = await MenuModel.create(newFoodData)

    res.status(201).json(newMenu)

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const menuId = req.params.id;
  const { title, ingridients, categoryId, img } = req.body;
  const newFoodData = removeEmptyProps({ title, ingridients, categoryId, img });

  try {
    MenuModel.validateUpdate(newFoodData);

    const updatedMenu = await MenuModel.findByIdAndUpdate(
      menuId,
      newFoodData,
      { new: true }
    );

    if (updatedMenu === null) throw createCupNotFoundError(menuId);

    res.status(200).json(updatedMenu)

  } catch (err) { sendErrorResponse(err, res); }
};


const remove = async (req, res) => {
  const menuId = req.params.id;

  try {
    const deletedFood = await MenuModel.findByIdAndDelete(menuId);
    if (deletedFood === null) createMenuNotFoundError(menuId);

    res.status(200).json(deletedFood);
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  update,
  remove,
};
