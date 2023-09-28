module.exports = (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;

  const Area = sequelize.define(
    "area",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(500),
        allowNull: false,
        min: 1,
        max: 500,
      },
      path: {
        type: DataTypes.TEXT(1000),
        allowNull: false,
      },
      enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      underscored: true,
      timestamps: true,
      freezeTableName: true,
      tableName: "area",
    }
  );
  // Area.sync({force: true});

  return Area;
};
