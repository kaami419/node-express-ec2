const { UserModel, RoleModel, AreaModel } = require("../models");

exports.updateUser = async (data, id) =>
  await UserModel.update(data, { where: { id } });

exports.getAllKnocker = async ({ limit, offset }) =>
  await UserModel.findAndCountAll({
    where: {
      deleted: false,
    },
    attributes: [
      "id",
      "firstName",
      "lastName",
      "userName",
      "email",
      "phone",
      "status",
    ],
    include: [
      {
        model: RoleModel,
        attributes: ["name", "id"],
        where: {
          name: "Knocker",
        },
      },
    ],
    raw: true,
    order: [["id", "DESC"]],
    limit,
    offset,
  });

exports.findKnockerById = async (id) =>
  await UserModel.findOne({
    where: {
      id,
      deleted: false,
    },
    include: [
      {
        model: RoleModel,
        attributes: ["name", "id"],
        where: {
          name: "Knocker",
        },
      },
    ],
    raw: true,
  });

exports.findKnockersAreasById = async (id) =>
  await UserModel.findAll({
    where: {
      id,
      deleted: false,
    },
    include: [
      {
        model: AreaModel,
        attributes: ["name", "id"],
        as: "areas",
      },
    ],
  });
