const Sequelize = require("sequelize");

class Medicamentos extends Sequelize.Model {

    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                hour: Sequelize.TIME,
                date_i: Sequelize.DATE,
                qtde: Sequelize.INTEGER,
                qtde_days: Sequelize.INTEGER,
                ativo: Sequelize.BOOLEAN
            },
            {
                sequelize,
            }
        );
    }

}

module.exports = Medicamentos;