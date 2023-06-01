const mongoose = require("mongoose");
const Joi = require("joi");

const cakeSchema = new mongoose.Schema({
  name:String,
  cals:String,
  price:Number,
  // בנוסף כל רשומה בברירת מחדל שמייצר אותה
  // ייתן לה את התאריך של עכשיו
  date:{
    type:Date, default:Date.now()
  },
  user_id:String
})

exports.CakeModel = mongoose.model("cakes",cakeSchema);

exports.validateCake = (_reqBody) => {
  let schemaJoi = Joi.object({
    name:Joi.string().min(2).max(99).required(),
    cals:Joi.string().min(2).max(99).required(),
    price:Joi.number().min(20).max(200).required()
  })
  return schemaJoi.validate(_reqBody)
}