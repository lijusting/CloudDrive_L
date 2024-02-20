var DataTypes = require("sequelize").DataTypes;
var _file = require("./file");

function initModels(sequelize) {
  var file = _file(sequelize, DataTypes);

  file.belongsTo(user, { as: "uid_user", foreignKey: "uid" });
  user.hasMany(file, { as: "files", foreignKey: "uid" });

  return {
    file,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
