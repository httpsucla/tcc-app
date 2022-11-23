const Sequelize = require("sequelize");

class Gavetas extends Sequelize.Model {

    static init(sequelize) {
        super.init(
            {
                dthr_abertura: Sequelize.DATE,
                ocupado: Sequelize.BOOLEAN,
                is_atrasado: Sequelize.BOOLEAN
            },
            {
                sequelize,
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Medicamentos, { foreignKey: "medicamentoId" });
    }
}

module.exports = Gavetas;