const { PinModel } = require("../models");

exports.create = async (data) => await PinModel.create({ ...data });

exports.findAll = async ({ limit, offset }) =>
  await PinModel.findAndCountAll({
    where: {
      deleted: false,
    },
    raw: true,
    order: [["id", "DESC"]],
    limit,
    offset,
  });

exports.findById = async (id) =>
  await PinModel.findOne({
    where: {
      id,
      deleted: false,
    },
    raw: true,
  });

exports.updatePin = async (id, data) =>
  await PinModel.update(data, { where: { id } });
