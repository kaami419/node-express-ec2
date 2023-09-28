const { AreaModel, UserModel } = require("../models");

exports.create = async (data) => await AreaModel.create({ ...data });

exports.findAll = async ({ limit, offset }) =>
  await AreaModel.findAndCountAll({
    where: {
      deleted: false,
    },
    raw: true,
    order: [["id", "DESC"]],
    limit,
    offset,
  });

exports.findAreaById = async (id) =>
  await AreaModel.findOne({
    where: {
      id,
      deleted: false,
    },
    raw: true,
  });

exports.findAllAreaById = async (id) =>
  await AreaModel.findAll({
    where: {
      id,
      deleted: false,
    },
    include: [
      {
        model: UserModel,
        as: "users",
        attributes: ["id", "userName"],
      },
    ],
  });
