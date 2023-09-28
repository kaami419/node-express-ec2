const { sequelize, Sequelize } = require("./../config");

// Initialize Models
const UserModel = require("./users")(sequelize, Sequelize);
const UsersTokensModel = require("./user_tokens")(sequelize, Sequelize);
const BasicTokensModel = require("./basic_tokens")(sequelize, Sequelize);
const RoleModel = require("./role")(sequelize, Sequelize);
const PermissionModel = require("./permission")(sequelize, Sequelize);
const PreRegistrationModel = require("./pre_registration")(
  sequelize,
  Sequelize
);
const AreaModel = require("./area")(sequelize, Sequelize);
const PinModel = require("./pin")(sequelize, Sequelize);

// Add associations
UserModel.hasMany(UsersTokensModel, { foreignKey: "user_id" });
UserModel.belongsToMany(RoleModel, {
  through: "user_roles",
  foreignKey: "user_id",
  timestamps: false,
});

UserModel.belongsToMany(AreaModel, {
  through: "users_areas",
  foreignKey: "user_id",
  as: "areas",
});
AreaModel.belongsToMany(UserModel, {
  through: "users_areas",
  foreignKey: "area_id",
  as: "users",
});

UsersTokensModel.belongsTo(UserModel, { foreignKey: "user_id" });
PermissionModel.belongsToMany(RoleModel, {
  through: "role_permissions",
  foreignKey: "permissionId",
});
RoleModel.belongsToMany(PermissionModel, {
  through: "role_permissions",
  foreignKey: "role_id",
});
UserModel.belongsToMany(RoleModel, {
  through: "user_roles",
  foreignKey: "user_id",
  timestamps: false,
});
module.exports = {
  UserModel,
  UsersTokensModel,
  BasicTokensModel,
  RoleModel,
  PermissionModel,
  PreRegistrationModel,
  AreaModel,
  PinModel,
};
