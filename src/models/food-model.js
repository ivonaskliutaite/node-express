const { Schema, Types, model } = require('mongoose');
const yup = require('yup');

const foodSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  ingridients: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  img: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const foodValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Recipe.title must be a string')
    .required('Recipe.title is required'),
  ingridients: yup
    .string().typeError('Recipe.ingridients must be a string')
    .required('Recipe.ingridients is required'),
  categoryId: yup
    .string().typeError('Recipe.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'Recipe.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    )
    .required('Recipe.categoryId is required'),
  img: yup
    .string().typeError('Recipe.img must be a string')
    .required('Recipe.img is required'),
});

const menuUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('Recipe.title must be a string'),
  ingridients: yup.string().typeError('Recipe.ingridients must be a string'),
  categoryId: yup.string().typeError('Recipe.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'Recipe.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    ),
  img: yup.string().typeError('Recipe.img must be a string'),
});

foodSchema.statics.validate = (menuData) => foodValidationSchema.validateSync(menuData)
foodSchema.statics.validateUpdate = (menuData) => menuUpdateValidationSchema.validateSync(menuData)

const MenuModel = model('Food', foodSchema);

module.exports = MenuModel;
