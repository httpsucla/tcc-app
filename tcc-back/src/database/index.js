const Sequelize = require("sequelize");
const dbConfig = require("./config/dbconfig");

const Medicamentos = require("../models/Medicamentos");
const Gavetas = require("../models/Gavetas");

const connection = new Sequelize(dbConfig);

Medicamentos.init(connection);
Gavetas.init(connection);

Medicamentos.associate(connection.models);
Gavetas.associate(connection.models);

module.exports = connection;