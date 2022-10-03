const ticket = {};
const sql = require('../configuracionBaseDatos/baseDatos.sql');
const orm = require('../configuracionBaseDatos/baseDatos.orm');

ticket.approved = async (req, res) => {
    const user = req.user || null;
    const id = req.params.id

    const reserveDB = await orm.reserve.findOne({
        where: {
            id: id
        },
        raw: true
    });
    console.log('res', reserveDB)
    const dataUpdate = {
        status: 'Confirmada'
    }
    await orm.reserve.update(dataUpdate, {
        where: {id: reserveDB.id}
    }).then(() => {
    });

    const newTicket = await orm.ticket.create({
        idReserve: reserveDB.id,
        exitPlataform: (Math.floor(Math.random() * 10) + 1),
        subTotal: reserveDB.subTotal,
        total: (reserveDB.subTotal + 0.25)
    }).then(res => {
        return res
    }).catch(err => {
        console.log(err);
        return null
    });

    res.redirect('/ticket/' + newTicket.id)


}


ticket.getIndex = async (req, res) => {
    const id = req.params.id;
    const client = req.user;
    const ticket = await orm.ticket.findOne({
            where: {
                id: id,
                state: 1

            }, raw: true
        },
    );
    const reserve = await orm.reserve.findOne({
            where: {
                id: ticket.idReserve,
                state: 1

            }, raw: true
        },
    );

    const timeBus = await orm.timeBus.findOne({
            where: {
                id: reserve.idTime,
                state: 1

            }, raw: true
        },
    );

    const root = await orm.root.findOne({
            where: {
                id: timeBus.idRoot,
                state: 1

            }, raw: true
        },
    );


    const bus = await orm.bus.findOne({
            where: {
                id: timeBus.idBus,
                state: 1

            }, raw: true
        },
    );

    const driver = await orm.driver.findOne({
            where: {
                id: bus.idDriver,
                state: 1
            }, raw: true
        },
    );

    ticket.reserve = reserve;
    ticket.timeBus = timeBus;
    ticket.bus = bus;
    ticket.driver = driver;
    ticket.root = root;

    console.log('ticket', ticket)
    res.render('ticket/index', {ticket,client})
}
module.exports = ticket