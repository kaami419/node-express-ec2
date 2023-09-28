const { PreRegistrationModel } = require("../models");

exports.create = async (data) => await PreRegistrationModel.create({ ...data });

exports.findByEmail = async (email) =>
  await PreRegistrationModel.findOne({
    where: {
      email,
      deleted: false,
    },
  });

exports.findAll = async ({ limit, offset }) =>
  await PreRegistrationModel.findAndCountAll({
    where: {
      deleted: false,
    },
    raw: true,
    order: [["id", "DESC"]],
    limit,
    offset,
  });
