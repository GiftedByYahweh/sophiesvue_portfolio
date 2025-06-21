"use strict";

const { PRICE_NAME } = require("../../../utils/mongodb");

module.exports.priceRepository = (mongo) => {
  const priceModel = mongo.collection(PRICE_NAME);

  return {
    async get() {
      const profile = await priceModel.find().toArray();
      return profile;
    },
    async findOne(category) {
      const profile = await priceModel.findOne({ category });
      return profile;
    },
    async create({ price, description, importantInfo, photo, category }) {
      const newPrice = await priceModel.insertOne({
        price,
        description,
        importantInfo,
        photo,
        category,
      });
      return newPrice;
    },
    async update({ price, description, importantInfo, photo, category }) {
      const updated = await priceModel.findOneAndUpdate(
        { category: category },
        {
          $set: {
            price,
            description,
            importantInfo,
            photo,
            category,
          },
        }
      );
      return updated;
    },
  };
};
