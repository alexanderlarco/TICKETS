const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");

const dbName = process.env.DB_SCHEMAS || "tickets";
const dbHost = "localhost";
const dbPort = 3306;
const dbUser = "root";
const dbPass = "ricky0812";

const db = mysql
    .createConnection({
        host: dbHost,
        port: dbPort,
        user: dbUser,
        password: dbPass,
    })
    .then((connection) => {
        connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
            console.info("Base de datos creada o comprobada correctamente");
        });
    });

//connection
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000,
    },
});

//Models
const clientModel = require("../modelos/cliente/cliente");
const reserveModel = require("../modelos/reserve/reserve");
const ticketModel = require("../modelos/ticket/ticket");
const ecommendModel = require("../modelos/ecommend/ecommend");
const packModel = require("../modelos/pack/pack");
const timeBusModel = require("../modelos/timeBus/timeBus");
const busModel = require("../modelos/bus/bus");
const rootModel = require("../modelos/root/root");
const driverModel = require("../modelos/driver/driver");
const memberModel = require("../modelos/member/member");
const coopModel = require("../modelos/coop/cooperative");
//Instance
const client = clientModel(sequelize, Sequelize);
const reserve = reserveModel(sequelize, Sequelize);
const ticket = ticketModel(sequelize, Sequelize);
const ecommend = ecommendModel(sequelize, Sequelize);
const pack = packModel(sequelize, Sequelize);
const bus = busModel(sequelize, Sequelize);
const timeBus = timeBusModel(sequelize, Sequelize);
const root = rootModel(sequelize, Sequelize);
const driver = driverModel(sequelize, Sequelize);
const member = memberModel(sequelize, Sequelize);
const coop = coopModel(sequelize, Sequelize);

//relationship
client.hasMany(reserve, {
    foreignKey: 'clientId',
    sourceKey: 'id'
})
reserve.belongsTo(client, {
    foreignKey: 'clientId',
    targetKey: 'id'
});

timeBus.hasOne(reserve, {
    foreignKey: 'idTime',
    sourceKey: 'id'
});
reserve.belongsTo(timeBus, {
    foreignKey: 'idTime',
    targetKey: 'id'
});
reserve.hasOne(ticket, {
    foreignKey: 'idReserve',
    sourceKey: 'id'
});

ticket.belongsTo(reserve, {
    foreignKey: 'idReserve',
    targetKey: 'id'
})



client.hasOne(ecommend, {
    foreignKey: 'idSender',
    sourceKey: 'id'
})

client.hasOne(ecommend, {
    foreignKey: 'idRecipient',
    sourceKey: 'id'
})

ecommend.belongsTo(client, {
    foreignKey: 'idSender',
    targetKey: 'id'
});

ecommend.belongsTo(client, {
    foreignKey: 'idRecipient',
    targetKey: 'id'
});

ecommend.hasMany(pack, {
    foreignKey: 'idEcommend',
    sourceKey: 'id'
})

pack.belongsTo(ecommend, {
    foreignKey: 'idEcommend',
    targetKey: 'id'
})

bus.hasMany(ecommend, {
    foreignKey: 'idBus',
    sourceKey: 'id'
});

ecommend.belongsTo(bus, {
    foreignKey: 'idBus',
    targetKey: 'id'
});

timeBus.hasOne(bus, {
    foreignKey: 'idBus',
    sourceKey: 'id'
})

bus.belongsTo(timeBus, {
    foreignKey: 'idBus',
    targetKey: 'id'
})

timeBus.belongsTo(root, {
    foreignKey: 'idRoot',
    targetKey: 'id'
})

root.hasOne(timeBus, {
    foreignKey: 'idRoot',
    sourceKey: 'id'
})


driver.hasMany(bus, {
    foreignKey: 'idDriver',
    targetKey: 'id'
});

bus.belongsTo(driver, {
    foreignKey: 'idDriver',
    sourceKey: 'id'
});
member.hasMany(bus, {
    foreignKey: 'idMember',
    sourceKey: 'id'
});

bus.belongsTo(member, {
    foreignKey: 'idMember',
    targetKey: 'id'
})

coop.hasMany(member)
member.belongsTo(coop)


sequelize
    .authenticate()
    .then(() => {
        console.log("Conectado");
    })
    .catch((err) => {
        console.log("No se conecto");
    });

sequelize.sync({force: false}).then(() => {
    console.log("Tablas sincronizadas");
});


module.exports = {
    client,
    root,
    coop,
    member,
    bus,
    driver,
    timeBus,
    ticket,
    reserve,
    ecommend,
    pack
};
