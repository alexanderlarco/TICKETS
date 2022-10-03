const bus = (sequelize, type) => {
    return sequelize.define("bus", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        numeroUnidad:{
            type: type.STRING,
            allowNull: false,
        },
        placa: {
            type: type.DATE,
            allowNull: false
        },
        capacidad: {
            type: type.DATE,
            allowNull: true
        },
        
        estado: {
            type: type.ENUM(),
            values: ["Activo", "Danado", "En Mantenimiento", "Perdido", "Suspendido", ],
            defaultValue: "Activo"
        },
        estado: { type: type.BOOLEAN, defaultValue: true },
    });
};

module.exports = bus;